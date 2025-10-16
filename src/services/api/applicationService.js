import applicationsData from "@/services/mockData/applications.json";

class ApplicationService {
  constructor() {
    this.applications = [...applicationsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [...this.applications];
  }

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const application = this.applications.find(app => app.Id === parseInt(id));
    return application ? { ...application } : null;
  }

  async getByJobId(jobId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    return this.applications.filter(app => parseInt(app.jobId) === parseInt(jobId));
  }

  async create(applicationData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newApplication = {
      Id: Math.max(...this.applications.map(app => app.Id)) + 1,
      ...applicationData
    };
    
    this.applications.push(newApplication);
    return { ...newApplication };
  }

  async update(id, updates) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const appIndex = this.applications.findIndex(app => app.Id === parseInt(id));
    if (appIndex === -1) {
      throw new Error("Application not found");
    }
    
    this.applications[appIndex] = {
      ...this.applications[appIndex],
      ...updates
    };
    
    return { ...this.applications[appIndex] };
  }

  async delete(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const appIndex = this.applications.findIndex(app => app.Id === parseInt(id));
    if (appIndex === -1) {
      throw new Error("Application not found");
    }
    
    this.applications.splice(appIndex, 1);
    return true;
  }
}

export const applicationService = new ApplicationService();