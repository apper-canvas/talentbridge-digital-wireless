import jobsData from "@/services/mockData/jobs.json";

class JobService {
  constructor() {
    this.jobs = [...jobsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [...this.jobs];
  }

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const job = this.jobs.find(job => job.Id === parseInt(id));
    return job ? { ...job } : null;
  }

  async create(jobData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newJob = {
      Id: Math.max(...this.jobs.map(job => job.Id)) + 1,
      ...jobData
    };
    
    this.jobs.push(newJob);
    return { ...newJob };
  }

  async update(id, updates) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const jobIndex = this.jobs.findIndex(job => job.Id === parseInt(id));
    if (jobIndex === -1) {
      throw new Error("Job not found");
    }
    
    this.jobs[jobIndex] = {
      ...this.jobs[jobIndex],
      ...updates
    };
    
    return { ...this.jobs[jobIndex] };
  }

  async delete(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const jobIndex = this.jobs.findIndex(job => job.Id === parseInt(id));
    if (jobIndex === -1) {
      throw new Error("Job not found");
    }
    
    this.jobs.splice(jobIndex, 1);
    return true;
  }
}

export const jobService = new JobService();