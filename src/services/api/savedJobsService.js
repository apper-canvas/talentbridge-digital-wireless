// Mock service for managing saved/bookmarked jobs
// Uses localStorage for persistence until database integration available

const STORAGE_KEY = 'savedJobs';

// Get all saved jobs from localStorage
const getSavedJobsFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading saved jobs from storage:', error);
    return [];
  }
};

// Save jobs array to localStorage
const saveSavedJobsToStorage = (jobs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch (error) {
    console.error('Error saving jobs to storage:', error);
  }
};

// Get all saved jobs
export const getAll = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedJobs = getSavedJobsFromStorage();
      resolve([...savedJobs]);
    }, 100);
  });
};

// Get saved job by ID
export const getById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const savedJobs = getSavedJobsFromStorage();
      const job = savedJobs.find(j => j.Id === parseInt(id));
      if (job) {
        resolve({ ...job });
      } else {
        reject(new Error('Saved job not found'));
      }
    }, 100);
  });
};

// Check if a job is saved
export const isJobSaved = async (jobId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedJobs = getSavedJobsFromStorage();
      const isSaved = savedJobs.some(j => j.JobId === parseInt(jobId));
      resolve(isSaved);
    }, 100);
  });
};

// Save a job (create bookmark)
export const create = async (jobId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const savedJobs = getSavedJobsFromStorage();
      
      // Check if already saved
      const alreadySaved = savedJobs.some(j => j.JobId === parseInt(jobId));
      if (alreadySaved) {
        reject(new Error('Job already saved'));
        return;
      }

      // Generate new ID
      const newId = savedJobs.length > 0 
        ? Math.max(...savedJobs.map(j => j.Id)) + 1 
        : 1;

      const newSavedJob = {
        Id: newId,
        JobId: parseInt(jobId),
        SavedAt: new Date().toISOString()
      };

      const updatedJobs = [...savedJobs, newSavedJob];
      saveSavedJobsToStorage(updatedJobs);
      resolve({ ...newSavedJob });
    }, 100);
  });
};

// Remove a saved job (delete bookmark)
export const deleteSavedJob = async (jobId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const savedJobs = getSavedJobsFromStorage();
      const jobIndex = savedJobs.findIndex(j => j.JobId === parseInt(jobId));
      
      if (jobIndex === -1) {
        reject(new Error('Saved job not found'));
        return;
      }

      const updatedJobs = savedJobs.filter(j => j.JobId !== parseInt(jobId));
      saveSavedJobsToStorage(updatedJobs);
      resolve({ success: true });
    }, 100);
  });
};

export default {
  getAll,
  getById,
  isJobSaved,
  create,
  delete: deleteSavedJob
};