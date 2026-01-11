// CV Management Service - Firestore CRUD operations
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
  serverTimestamp
} from '../config/firebase';

const CV_COLLECTION = 'cvs';
const USERS_COLLECTION = 'users';

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
    suggestedSkills: profession.suggestedSkills || null
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

    console.log('Creating CV for user:', userId);
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
    console.log('CV created successfully with ID:', cvRef.id);
    return { id: cvRef.id, error: null };
  } catch (error) {
    console.error('Error creating CV:', error);
    return { id: null, error: error.message };
  }
};

// Get all CVs for a user
export const getUserCVs = async (userId) => {
  try {
    // Validate userId
    if (!userId) {
      console.error('getUserCVs: userId is required');
      return { cvs: [], error: 'User ID is required' };
    }

    console.log('Fetching CVs for userId:', userId);
    // Use simple where query without orderBy to avoid requiring composite index
    const q = query(
      collection(db, CV_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    console.log('Query returned', querySnapshot.size, 'documents');
    const cvs = [];
    querySnapshot.forEach((docSnap) => {
      console.log('Found CV:', docSnap.id, docSnap.data().title);
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

    console.log('Returning', cvs.length, 'CVs');
    return { cvs, error: null };
  } catch (error) {
    console.error('Error getting CVs:', error);
    return { cvs: [], error: error.message };
  }
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

// Get user payment status
export const getUserPaymentStatus = async (userId) => {
  try {
    // Validate userId
    if (!userId) {
      console.error('getUserPaymentStatus: userId is required');
      return { hasPaid: false, paidAt: null, error: 'User ID is required' };
    }

    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() || {};
      return {
        hasPaid: data.hasPaid || false,
        paidAt: data.paidAt || null,
        error: null
      };
    }
    // User document doesn't exist yet
    return { hasPaid: false, paidAt: null, error: null };
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
