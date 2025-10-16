import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class ApplicationService {
  constructor() {
    this.tableName = "application_c";
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
          { field: { Name: "candidate_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "cover_letter_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "submitted_date_c" } },
          { field: { Name: "job_id_c" } }
        ],
        orderBy: [{ fieldName: "submitted_date_c", sorttype: "DESC" }],
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

      return response.data.map(app => ({
        Id: app.Id,
        candidateName: app.candidate_name_c || "",
        email: app.email_c || "",
        phone: app.phone_c || "",
        coverLetter: app.cover_letter_c || "",
        resumeUrl: app.resume_url_c || "",
        status: app.status_c || "submitted",
        submittedDate: app.submitted_date_c || new Date().toISOString(),
        jobId: app.job_id_c?.Id ? app.job_id_c.Id.toString() : ""
      }));
    } catch (error) {
      console.error("Error fetching applications:", error?.message || error);
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
          { field: { Name: "candidate_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "cover_letter_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "submitted_date_c" } },
          { field: { Name: "job_id_c" } }
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

      const app = response.data;
      return {
        Id: app.Id,
        candidateName: app.candidate_name_c || "",
        email: app.email_c || "",
        phone: app.phone_c || "",
        coverLetter: app.cover_letter_c || "",
        resumeUrl: app.resume_url_c || "",
        status: app.status_c || "submitted",
        submittedDate: app.submitted_date_c || new Date().toISOString(),
        jobId: app.job_id_c?.Id ? app.job_id_c.Id.toString() : ""
      };
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error?.message || error);
      return null;
    }
  }

  async getByJobId(jobId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return [];
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "candidate_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "cover_letter_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "submitted_date_c" } },
          { field: { Name: "job_id_c" } }
        ],
        where: [
          {
            FieldName: "job_id_c",
            Operator: "EqualTo",
            Values: [parseInt(jobId)]
          }
        ],
        orderBy: [{ fieldName: "submitted_date_c", sorttype: "DESC" }],
        pagingInfo: { limit: 1000, offset: 0 }
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      if (!response?.data?.length) {
        return [];
      }

      return response.data.map(app => ({
        Id: app.Id,
        candidateName: app.candidate_name_c || "",
        email: app.email_c || "",
        phone: app.phone_c || "",
        coverLetter: app.cover_letter_c || "",
        resumeUrl: app.resume_url_c || "",
        status: app.status_c || "submitted",
        submittedDate: app.submitted_date_c || new Date().toISOString(),
        jobId: app.job_id_c?.Id ? app.job_id_c.Id.toString() : ""
      }));
    } catch (error) {
      console.error(`Error fetching applications for job ${jobId}:`, error?.message || error);
      return [];
    }
  }

  async create(applicationData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        toast.error("Service unavailable");
        return null;
      }

      const params = {
        records: [{
          Name: applicationData.candidateName,
          candidate_name_c: applicationData.candidateName,
          email_c: applicationData.email,
          phone_c: applicationData.phone,
          cover_letter_c: applicationData.coverLetter,
          resume_url_c: applicationData.resumeUrl,
          status_c: applicationData.status || "submitted",
          submitted_date_c: new Date().toISOString(),
          job_id_c: parseInt(applicationData.jobId)
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
          console.error(`Failed to create ${failed.length} applications: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Application submitted successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating application:", error?.message || error);
      toast.error("Failed to submit application");
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

      if (updates.candidateName) {
        updateData.Name = updates.candidateName;
        updateData.candidate_name_c = updates.candidateName;
      }
      if (updates.email) updateData.email_c = updates.email;
      if (updates.phone) updateData.phone_c = updates.phone;
      if (updates.coverLetter) updateData.cover_letter_c = updates.coverLetter;
      if (updates.resumeUrl) updateData.resume_url_c = updates.resumeUrl;
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
          console.error(`Failed to update ${failed.length} applications: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Application updated successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating application:", error?.message || error);
      toast.error("Failed to update application");
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
          console.error(`Failed to delete ${failed.length} applications: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Application deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting application:", error?.message || error);
      toast.error("Failed to delete application");
      return false;
    }
  }
}

export const applicationService = new ApplicationService();