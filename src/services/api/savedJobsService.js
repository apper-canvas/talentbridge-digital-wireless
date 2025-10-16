import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const getAll = async () => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "job_id_c" } },
        { field: { Name: "saved_at_c" } }
      ],
      orderBy: [{ fieldName: "saved_at_c", sorttype: "DESC" }],
      pagingInfo: { limit: 1000, offset: 0 }
    };

    const response = await apperClient.fetchRecords("saved_job_c", params);

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    if (!response?.data?.length) {
      return [];
    }

    return response.data.map(saved => ({
      Id: saved.Id,
      JobId: saved.job_id_c?.Id || null,
      SavedAt: saved.saved_at_c || new Date().toISOString()
    }));
  } catch (error) {
    console.error("Error fetching saved jobs:", error?.message || error);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "job_id_c" } },
        { field: { Name: "saved_at_c" } }
      ]
    };

    const response = await apperClient.getRecordById("saved_job_c", parseInt(id), params);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (!response?.data) {
      return null;
    }

    const saved = response.data;
    return {
      Id: saved.Id,
      JobId: saved.job_id_c?.Id || null,
      SavedAt: saved.saved_at_c || new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching saved job ${id}:`, error?.message || error);
    return null;
  }
};

export const isJobSaved = async (jobId) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return false;
    }

    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "job_id_c" } }
      ],
      where: [
        {
          FieldName: "job_id_c",
          Operator: "EqualTo",
          Values: [parseInt(jobId)]
        }
      ],
      pagingInfo: { limit: 1, offset: 0 }
    };

    const response = await apperClient.fetchRecords("saved_job_c", params);

    if (!response.success) {
      return false;
    }

    return response?.data?.length > 0;
  } catch (error) {
    console.error("Error checking if job is saved:", error?.message || error);
    return false;
  }
};

export const create = async (jobId) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      toast.error("Service unavailable");
      return null;
    }

    const isSaved = await isJobSaved(jobId);
    if (isSaved) {
      toast.info("Job already saved");
      return null;
    }

    const params = {
      records: [{
        Name: `Saved Job - ${jobId}`,
        job_id_c: parseInt(jobId),
        saved_at_c: new Date().toISOString()
      }]
    };

    const response = await apperClient.createRecord("saved_job_c", params);

    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);

      if (failed.length > 0) {
        console.error(`Failed to save ${failed.length} jobs: ${JSON.stringify(failed)}`);
        failed.forEach(record => {
          if (record.message) toast.error(record.message);
        });
      }

      if (successful.length > 0) {
        return successful[0].data;
      }
    }

    return null;
  } catch (error) {
    console.error("Error saving job:", error?.message || error);
    toast.error("Failed to save job");
    return null;
  }
};

export const deleteSavedJob = async (jobId) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      toast.error("Service unavailable");
      return false;
    }

    const params = {
      fields: [
        { field: { Name: "Name" } }
      ],
      where: [
        {
          FieldName: "job_id_c",
          Operator: "EqualTo",
          Values: [parseInt(jobId)]
        }
      ],
      pagingInfo: { limit: 1, offset: 0 }
    };

    const findResponse = await apperClient.fetchRecords("saved_job_c", params);

    if (!findResponse.success || !findResponse?.data?.length) {
      toast.error("Saved job not found");
      return false;
    }

    const savedJobId = findResponse.data[0].Id;

    const deleteParams = {
      RecordIds: [savedJobId]
    };

    const response = await apperClient.deleteRecord("saved_job_c", deleteParams);

    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return false;
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);

      if (failed.length > 0) {
        console.error(`Failed to delete ${failed.length} saved jobs: ${JSON.stringify(failed)}`);
        failed.forEach(record => {
          if (record.message) toast.error(record.message);
        });
      }

      if (successful.length > 0) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error deleting saved job:", error?.message || error);
    toast.error("Failed to delete saved job");
    return false;
  }
};

export default {
  getAll,
  getById,
  isJobSaved,
  create,
  delete: deleteSavedJob
};