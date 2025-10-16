import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class JobService {
  constructor() {
    this.tableName = "job_c";
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return [];
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "job_type_c" } },
          { field: { Name: "experience_level_c" } },
          { field: { Name: "industry_c" } },
          { field: { Name: "salary_range_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "requirements_c" } },
          { field: { Name: "benefits_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "posted_date_c" } }
        ],
        orderBy: [{ fieldName: "posted_date_c", sorttype: "DESC" }],
        pagingInfo: { limit: 1000, offset: 0 }
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(job => ({
        Id: job.Id,
        title: job.title_c || "",
        company: job.company_c || "",
        location: job.location_c || "",
        jobType: job.job_type_c || "",
        experienceLevel: job.experience_level_c || "",
        industry: job.industry_c || "",
        salaryRange: job.salary_range_c || "",
        description: job.description_c || "",
        requirements: job.requirements_c ? job.requirements_c.split('\n').filter(r => r.trim()) : [],
        benefits: job.benefits_c ? job.benefits_c.split('\n').filter(b => b.trim()) : [],
        status: job.status_c || "active",
        postedDate: job.posted_date_c || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error fetching jobs:", error?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return null;
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "job_type_c" } },
          { field: { Name: "experience_level_c" } },
          { field: { Name: "industry_c" } },
          { field: { Name: "salary_range_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "requirements_c" } },
          { field: { Name: "benefits_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "posted_date_c" } }
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (!response?.data) {
        return null;
      }

      const job = response.data;
      return {
        Id: job.Id,
        title: job.title_c || "",
        company: job.company_c || "",
        location: job.location_c || "",
        jobType: job.job_type_c || "",
        experienceLevel: job.experience_level_c || "",
        industry: job.industry_c || "",
        salaryRange: job.salary_range_c || "",
        description: job.description_c || "",
        requirements: job.requirements_c ? job.requirements_c.split('\n').filter(r => r.trim()) : [],
        benefits: job.benefits_c ? job.benefits_c.split('\n').filter(b => b.trim()) : [],
        status: job.status_c || "active",
        postedDate: job.posted_date_c || new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error?.message || error);
      return null;
    }
  }

  async create(jobData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        toast.error("Service unavailable");
        return null;
      }

      const params = {
        records: [{
          Name: jobData.title,
          title_c: jobData.title,
          company_c: jobData.company,
          location_c: jobData.location,
          job_type_c: jobData.jobType,
          experience_level_c: jobData.experienceLevel,
          industry_c: jobData.industry,
          salary_range_c: jobData.salaryRange,
          description_c: jobData.description,
          requirements_c: Array.isArray(jobData.requirements) ? jobData.requirements.join('\n') : jobData.requirements,
          benefits_c: Array.isArray(jobData.benefits) ? jobData.benefits.join('\n') : jobData.benefits,
          status_c: jobData.status || "active",
          posted_date_c: new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} jobs: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Job posted successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating job:", error?.message || error);
      toast.error("Failed to create job");
      return null;
    }
  }

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        toast.error("Service unavailable");
        return null;
      }

      const updateData = {
        Id: parseInt(id)
      };

      if (updates.title) {
        updateData.Name = updates.title;
        updateData.title_c = updates.title;
      }
      if (updates.company) updateData.company_c = updates.company;
      if (updates.location) updateData.location_c = updates.location;
      if (updates.jobType) updateData.job_type_c = updates.jobType;
      if (updates.experienceLevel) updateData.experience_level_c = updates.experienceLevel;
      if (updates.industry) updateData.industry_c = updates.industry;
      if (updates.salaryRange) updateData.salary_range_c = updates.salaryRange;
      if (updates.description) updateData.description_c = updates.description;
      if (updates.requirements) {
        updateData.requirements_c = Array.isArray(updates.requirements) 
          ? updates.requirements.join('\n') 
          : updates.requirements;
      }
      if (updates.benefits) {
        updateData.benefits_c = Array.isArray(updates.benefits) 
          ? updates.benefits.join('\n') 
          : updates.benefits;
      }
      if (updates.status) updateData.status_c = updates.status;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} jobs: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Job updated successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating job:", error?.message || error);
      toast.error("Failed to update job");
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        toast.error("Service unavailable");
        return false;
      }

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} jobs: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Job deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting job:", error?.message || error);
      toast.error("Failed to delete job");
      return false;
    }
  }
}

export const jobService = new JobService();