// CV Management Service - Firestore CRUD operations with caching & real-time
import {
  db,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  onSnapshot
} from '../config/firebase';

const CV_COLLECTION = 'cvs';
const USERS_COLLECTION = 'users';

// ==================== Persistent Cache (localStorage + Memory) ====================
const STORAGE_KEY = 'cv_app_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Load cache from localStorage on startup
const loadPersistedCache = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Check if cache is still valid
      if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load cache:', e);
  }
  return { cvs: {}, payment: {}, timestamp: Date.now() };
};

// Save cache to localStorage
const persistCache = (cacheData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...cacheData,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('Failed to persist cache:', e);
  }
};

// Initialize from localStorage for instant loading
let persistedData = loadPersistedCache();

const cache = {
  cvs: new Map(Object.entries(persistedData.cvs || {})),
  paymentStatus: new Map(Object.entries(persistedData.payment || {})),
  lastFetch: new Map(),
  CACHE_DURATION: CACHE_DURATION,

  isValid(key) {
    const lastFetch = this.lastFetch.get(key);
    if (!lastFetch) {
      // Check if we have persisted data (from previous session)
      if (key.startsWith('cvs_') && this.cvs.has(key)) return true;
      if (key.startsWith('payment_') && this.paymentStatus.has(key)) return true;
      return false;
    }
    return Date.now() - lastFetch < this.CACHE_DURATION;
  },

  set(key, data) {
    if (key.startsWith('cvs_')) {
      this.cvs.set(key, data);
    } else if (key.startsWith('payment_')) {
      this.paymentStatus.set(key, data);
    }
    this.lastFetch.set(key, Date.now());

    // Persist to localStorage
    this._persist();
  },

  get(key) {
    if (key.startsWith('cvs_')) {
      return this.cvs.get(key);
    } else if (key.startsWith('payment_')) {
      return this.paymentStatus.get(key);
    }
    return null;
  },

  invalidate(key) {
    if (key.startsWith('cvs_')) {
      this.cvs.delete(key);
    } else if (key.startsWith('payment_')) {
      this.paymentStatus.delete(key);
    }
    this.lastFetch.delete(key);
    this._persist();
  },

  invalidateUser(userId) {
    this.invalidate(`cvs_${userId}`);
    this.invalidate(`payment_${userId}`);
  },

  _persist() {
    // Convert Maps to objects for JSON serialization
    const cvsObj = {};
    const paymentObj = {};
    this.cvs.forEach((v, k) => { cvsObj[k] = v; });
    this.paymentStatus.forEach((v, k) => { paymentObj[k] = v; });
    persistCache({ cvs: cvsObj, payment: paymentObj });
  }
};

// ==================== CV Operations ====================

// Helper function to serialize profession (remove functions like icon components)
const serializeProfession = (profession) => {
  if (!profession) return null;
  return {
    id: profession.id || null,
    name: profession.name || null,
    // Store icon as string name instead of function
    iconName: profession.icon?.name || profession.iconName || null,
    tips: profession.tips || null,
    suggestedSkills: profession.suggestedSkills || null,
    // Include sections array to prevent white screen when editing CVs
    sections: profession.sections || ['personalInfo', 'summary', 'experience', 'education', 'skills', 'certifications', 'projects', 'achievements']
  };
};

// Create a new CV
export const createCV = async (userId, cvData, profession) => {
  try {
    // Validate required parameters
    if (!userId) {
      console.error('createCV: userId is required');
      return { id: null, error: 'User ID is required' };
    }
    if (!cvData) {
      console.error('createCV: cvData is required');
      return { id: null, error: 'CV data is required' };
    }

    const cvRef = await addDoc(collection(db, CV_COLLECTION), {
      userId,
      title: cvData.personalInfo?.fullName
        ? `${cvData.personalInfo.fullName}'s CV`
        : 'Untitled CV',
      profession: serializeProfession(profession),
      cvData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Invalidate cache so next fetch gets fresh data
    cache.invalidate(`cvs_${userId}`);

    return { id: cvRef.id, error: null };
  } catch (error) {
    console.error('Error creating CV:', error);
    return { id: null, error: error.message };
  }
};

// Get all CVs for a user (with caching for fast loading)
export const getUserCVs = async (userId, forceRefresh = false) => {
  try {
    // Validate userId
    if (!userId) {
      console.error('getUserCVs: userId is required');
      return { cvs: [], error: 'User ID is required' };
    }

    const cacheKey = `cvs_${userId}`;

    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && cache.isValid(cacheKey)) {
      const cachedCvs = cache.get(cacheKey);
      if (cachedCvs) {
        return { cvs: cachedCvs, error: null, fromCache: true };
      }
    }

    // Use simple where query without orderBy to avoid requiring composite index
    const q = query(
      collection(db, CV_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const cvs = [];
    querySnapshot.forEach((docSnap) => {
      cvs.push({ id: docSnap.id, ...docSnap.data() });
    });

    // Sort client-side by updatedAt (newest first)
    cvs.sort((a, b) => {
      const getDate = (timestamp) => {
        if (!timestamp) return new Date(0);
        if (typeof timestamp.toDate === 'function') return timestamp.toDate();
        if (timestamp instanceof Date) return timestamp;
        return new Date(timestamp) || new Date(0);
      };
      return getDate(b.updatedAt) - getDate(a.updatedAt);
    });

    // Cache the result
    cache.set(cacheKey, cvs);

    return { cvs, error: null, fromCache: false };
  } catch (error) {
    console.error('Error getting CVs:', error);
    return { cvs: [], error: error.message };
  }
};

// Real-time listener for CVs (instant updates)
export const subscribeToUserCVs = (userId, callback) => {
  if (!userId) {
    console.error('subscribeToUserCVs: userId is required');
    return () => {};
  }

  const q = query(
    collection(db, CV_COLLECTION),
    where('userId', '==', userId)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const cvs = [];
    snapshot.forEach((docSnap) => {
      cvs.push({ id: docSnap.id, ...docSnap.data() });
    });

    // Sort by updatedAt (newest first)
    cvs.sort((a, b) => {
      const getDate = (timestamp) => {
        if (!timestamp) return new Date(0);
        if (typeof timestamp.toDate === 'function') return timestamp.toDate();
        if (timestamp instanceof Date) return timestamp;
        return new Date(timestamp) || new Date(0);
      };
      return getDate(b.updatedAt) - getDate(a.updatedAt);
    });

    // Update cache
    cache.set(`cvs_${userId}`, cvs);

    callback(cvs);
  }, (error) => {
    console.error('Real-time CVs error:', error);
    callback([], error);
  });

  return unsubscribe;
};

// Get a single CV by ID
export const getCV = async (cvId) => {
  try {
    // Validate cvId
    if (!cvId) {
      console.error('getCV: cvId is required');
      return { cv: null, error: 'CV ID is required' };
    }

    const docRef = doc(db, CV_COLLECTION, cvId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { cv: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { cv: null, error: 'CV not found' };
  } catch (error) {
    console.error('Error getting CV:', error);
    return { cv: null, error: error.message };
  }
};

// Update a CV
export const updateCV = async (cvId, cvData, title = null) => {
  try {
    // Validate required parameters
    if (!cvId) {
      console.error('updateCV: cvId is required');
      return { error: 'CV ID is required' };
    }
    if (!cvData) {
      console.error('updateCV: cvData is required');
      return { error: 'CV data is required' };
    }

    const docRef = doc(db, CV_COLLECTION, cvId);
    const updateData = {
      cvData,
      updatedAt: serverTimestamp()
    };
    if (title) {
      updateData.title = title;
    }
    await updateDoc(docRef, updateData);
    return { error: null };
  } catch (error) {
    console.error('Error updating CV:', error);
    return { error: error.message };
  }
};

// Delete a CV
export const deleteCV = async (cvId) => {
  try {
    // Validate cvId
    if (!cvId) {
      console.error('deleteCV: cvId is required');
      return { error: 'CV ID is required' };
    }

    const docRef = doc(db, CV_COLLECTION, cvId);
    await deleteDoc(docRef);
    return { error: null };
  } catch (error) {
    console.error('Error deleting CV:', error);
    return { error: error.message };
  }
};

// ==================== User Payment Status ====================

// Get user payment status (with caching)
export const getUserPaymentStatus = async (userId, forceRefresh = false) => {
  try {
    // Validate userId
    if (!userId) {
      console.error('getUserPaymentStatus: userId is required');
      return { hasPaid: false, paidAt: null, error: 'User ID is required' };
    }

    const cacheKey = `payment_${userId}`;

    // Return cached data if valid
    if (!forceRefresh && cache.isValid(cacheKey)) {
      const cachedStatus = cache.get(cacheKey);
      if (cachedStatus) {
        return { ...cachedStatus, error: null, fromCache: true };
      }
    }

    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    let result;
    if (docSnap.exists()) {
      const data = docSnap.data() || {};
      result = {
        hasPaid: data.hasPaid || false,
        paidAt: data.paidAt || null
      };
    } else {
      result = { hasPaid: false, paidAt: null };
    }

    // Cache the result
    cache.set(cacheKey, result);

    return { ...result, error: null, fromCache: false };
  } catch (error) {
    console.error('Error getting payment status:', error);
    return { hasPaid: false, paidAt: null, error: error.message };
  }
};

// Set user as paid (call this after successful payment)
export const setUserPaid = async (userId) => {
  try {
    // Validate userId
    if (!userId) {
      console.error('setUserPaid: userId is required');
      return { error: 'User ID is required' };
    }

    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        hasPaid: true,
        paidAt: serverTimestamp()
      });
    } else {
      // Create user document if it doesn't exist
      try {
        const { setDoc } = await import('firebase/firestore');
        await setDoc(docRef, {
          hasPaid: true,
          paidAt: serverTimestamp(),
          createdAt: serverTimestamp()
        });
      } catch (importError) {
        console.error('Error importing setDoc:', importError);
        return { error: 'Failed to create user document' };
      }
    }
    return { error: null };
  } catch (error) {
    console.error('Error setting payment status:', error);
    return { error: error.message };
  }
};

// ==================== Helper Functions ====================

// Check if user owns a CV
export const userOwnsCV = async (userId, cvId) => {
  try {
    if (!userId || !cvId) return false;
    const { cv, error } = await getCV(cvId);
    if (error || !cv) return false;
    return cv.userId === userId;
  } catch (error) {
    return false;
  }
};

// Duplicate a CV
export const duplicateCV = async (userId, cvId) => {
  try {
    // Validate required parameters
    if (!userId) {
      console.error('duplicateCV: userId is required');
      return { id: null, error: 'User ID is required' };
    }
    if (!cvId) {
      console.error('duplicateCV: cvId is required');
      return { id: null, error: 'CV ID is required' };
    }

    const { cv, error } = await getCV(cvId);
    if (error || !cv) {
      return { id: null, error: error || 'CV not found' };
    }

    // Create a new CV with the same data
    const newCvRef = await addDoc(collection(db, CV_COLLECTION), {
      userId,
      title: `${cv.title || 'Untitled CV'} (Copy)`,
      profession: cv.profession || null,
      cvData: cv.cvData || {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { id: newCvRef.id, error: null };
  } catch (error) {
    console.error('Error duplicating CV:', error);
    return { id: null, error: error.message };
  }
};
