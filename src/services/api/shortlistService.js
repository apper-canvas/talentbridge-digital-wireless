import shortlistData from "@/services/mockData/shortlistRequests.json";

class ShortlistService {
  constructor() {
    this.requests = [...shortlistData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [...this.requests];
  }

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const request = this.requests.find(req => req.Id === parseInt(id));
    return request ? { ...request } : null;
  }

  async getByEmployerId(employerId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    return this.requests.filter(req => req.employerId === employerId);
  }

  async create(requestData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newRequest = {
      Id: Math.max(...this.requests.map(req => req.Id)) + 1,
      ...requestData
    };
    
    this.requests.push(newRequest);
    return { ...newRequest };
  }

  async update(id, updates) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const reqIndex = this.requests.findIndex(req => req.Id === parseInt(id));
    if (reqIndex === -1) {
      throw new Error("Request not found");
    }
    
    this.requests[reqIndex] = {
      ...this.requests[reqIndex],
      ...updates
    };
    
    return { ...this.requests[reqIndex] };
  }

  async delete(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const reqIndex = this.requests.findIndex(req => req.Id === parseInt(id));
    if (reqIndex === -1) {
      throw new Error("Request not found");
    }
    
    this.requests.splice(reqIndex, 1);
    return true;
  }
}

export const shortlistService = new ShortlistService();