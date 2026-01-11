// Local Storage Manager for CV data

const STORAGE_KEY = 'cv_builder_data';
const AUTOSAVE_KEY = 'cv_builder_autosave';

export const storage = {
  // Save CV data
  save: (cvData, profession, userProfile) => {
    try {
      const dataToSave = {
        cvData,
        profession,
        userProfile,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Load CV data
  load: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  },

  // Auto-save with debouncing
  autoSave: (cvData, profession, userProfile) => {
    try {
      const dataToSave = {
        cvData,
        profession,
        userProfile,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error('Error auto-saving:', error);
      return false;
    }
  },

  // Load auto-saved data
  loadAutoSave: () => {
    try {
      const data = localStorage.getItem(AUTOSAVE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error loading auto-save:', error);
      return null;
    }
  },

  // Clear saved data
  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(AUTOSAVE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },

  // Export CV data as JSON file
  exportToJSON: (cvData, profession, userProfile) => {
    // Validate cvData before export
    if (!cvData) {
      console.error('exportToJSON: cvData is required');
      return false;
    }

    const dataToExport = {
      cvData,
      profession: profession || null,
      userProfile: userProfile || null,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    try {
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Safe access to personalInfo with fallbacks
      const fileName = cvData.personalInfo?.fullName || 'draft';
      link.download = `resume_${fileName}_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Error exporting to JSON:', error);
      return false;
    }
  },

  // Import CV data from JSON file
  importFromJSON: (file) => {
    return new Promise((resolve, reject) => {
      // Validate file parameter
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result;
          if (!result) {
            reject(new Error('Failed to read file'));
            return;
          }

          const data = JSON.parse(result);

          // Validate imported data structure
          if (!data || typeof data !== 'object') {
            reject(new Error('Invalid data format'));
            return;
          }

          // Ensure cvData exists in the imported file
          if (!data.cvData) {
            reject(new Error('Invalid CV file: missing CV data'));
            return;
          }

          resolve(data);
        } catch (error) {
          reject(new Error('Invalid JSON file: ' + (error.message || 'parse error')));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  },

  // Get all saved resumes (for future multi-resume support)
  getAllResumes: () => {
    const resumes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('cv_resume_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          resumes.push({ id: key, ...data });
        } catch (error) {
          console.error('Error parsing resume:', error);
        }
      }
    }
    return resumes;
  }
};

// Debounce utility for auto-save
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
