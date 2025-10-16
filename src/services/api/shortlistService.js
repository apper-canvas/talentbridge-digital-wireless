import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class ShortlistService {
  constructor() {
    this.tableName = "shortlist_request_c";
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
          { field: { Name: "employer_id_c" } },
          { field: { Name: "job_id_c" } },
          { field: { Name: "criteria_c" } },
          { field: { Name: "number_of_candidates_c" } },
          { field: { Name: "urgency_c" } },
          { field: { Name: "additional_notes_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "request_date_c" } }
        ],
        orderBy: [{ fieldName: "request_date_c", sorttype: "DESC" }],
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

      return response.data.map(req => ({
        Id: req.Id,
        employerId: req.employer_id_c || "",
        jobId: req.job_id_c?.Id ? req.job_id_c.Id.toString() : "",
        criteria: req.criteria_c || "",
        numberOfCandidates: req.number_of_candidates_c || 0,
        urgency: req.urgency_c || "medium",
        additionalNotes: req.additional_notes_c || "",
        status: req.status_c || "pending",
        requestDate: req.request_date_c || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error fetching shortlist requests:", error?.message || error);
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
          { field: { Name: "employer_id_c" } },
          { field: { Name: "job_id_c" } },
          { field: { Name: "criteria_c" } },
          { field: { Name: "number_of_candidates_c" } },
          { field: { Name: "urgency_c" } },
          { field: { Name: "additional_notes_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "request_date_c" } }
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

      const req = response.data;
      return {
        Id: req.Id,
        employerId: req.employer_id_c || "",
        jobId: req.job_id_c?.Id ? req.job_id_c.Id.toString() : "",
        criteria: req.criteria_c || "",
        numberOfCandidates: req.number_of_candidates_c || 0,
        urgency: req.urgency_c || "medium",
        additionalNotes: req.additional_notes_c || "",
        status: req.status_c || "pending",
        requestDate: req.request_date_c || new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching shortlist request ${id}:`, error?.message || error);
      return null;
    }
  }

  async getByEmployerId(employerId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return [];
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "employer_id_c" } },
          { field: { Name: "job_id_c" } },
          { field: { Name: "criteria_c" } },
          { field: { Name: "number_of_candidates_c" } },
          { field: { Name: "urgency_c" } },
          { field: { Name: "additional_notes_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "request_date_c" } }
        ],
        where: [
          {
            FieldName: "employer_id_c",
            Operator: "EqualTo",
            Values: [employerId]
          }
        ],
        orderBy: [{ fieldName: "request_date_c", sorttype: "DESC" }],
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

      return response.data.map(req => ({
        Id: req.Id,
        employerId: req.employer_id_c || "",
        jobId: req.job_id_c?.Id ? req.job_id_c.Id.toString() : "",
        criteria: req.criteria_c || "",
        numberOfCandidates: req.number_of_candidates_c || 0,
        urgency: req.urgency_c || "medium",
        additionalNotes: req.additional_notes_c || "",
        status: req.status_c || "pending",
        requestDate: req.request_date_c || new Date().toISOString()
      }));
    } catch (error) {
      console.error(`Error fetching shortlist requests for employer ${employerId}:`, error?.message || error);
      return [];
    }
  }

  async create(requestData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        toast.error("Service unavailable");
        return null;
      }

      const params = {
        records: [{
          Name: `Shortlist Request - ${new Date().toLocaleDateString()}`,
          employer_id_c: requestData.employerId,
          job_id_c: parseInt(requestData.jobId),
          criteria_c: requestData.criteria,
          number_of_candidates_c: parseInt(requestData.numberOfCandidates),
          urgency_c: requestData.urgency,
          additional_notes_c: requestData.additionalNotes,
          status_c: requestData.status || "pending",
          request_date_c: new Date().toISOString()
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
          console.error(`Failed to create ${failed.length} shortlist requests: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Shortlist request submitted successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating shortlist request:", error?.message || error);
      toast.error("Failed to submit shortlist request");
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

      if (updates.employerId) updateData.employer_id_c = updates.employerId;
      if (updates.jobId) updateData.job_id_c = parseInt(updates.jobId);
      if (updates.criteria) updateData.criteria_c = updates.criteria;
      if (updates.numberOfCandidates) updateData.number_of_candidates_c = parseInt(updates.numberOfCandidates);
      if (updates.urgency) updateData.urgency_c = updates.urgency;
      if (updates.additionalNotes) updateData.additional_notes_c = updates.additionalNotes;
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
          console.error(`Failed to update ${failed.length} shortlist requests: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Shortlist request updated successfully");
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating shortlist request:", error?.message || error);
      toast.error("Failed to update shortlist request");
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
          console.error(`Failed to delete ${failed.length} shortlist requests: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Shortlist request deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting shortlist request:", error?.message || error);
      toast.error("Failed to delete shortlist request");
      return false;
    }
  }
}

export const shortlistService = new ShortlistService();

export const shortlistService = new ShortlistService();