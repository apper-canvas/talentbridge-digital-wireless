import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import ShortlistRequestModal from "@/components/organisms/ShortlistRequestModal";
import { jobService } from "@/services/api/jobService";
import { applicationService } from "@/services/api/applicationService";
import { shortlistService } from "@/services/api/shortlistService";
import { formatDistanceToNow } from "date-fns";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [shortlistRequests, setShortlistRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShortlistModal, setShowShortlistModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [jobsData, applicationsData, shortlistData] = await Promise.all([
        jobService.getAll(),
        applicationService.getAll(),
        shortlistService.getAll()
      ]);

      setJobs(jobsData);
      setApplications(applicationsData);
      setShortlistRequests(shortlistData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRequestShortlist = (jobId) => {
    setSelectedJobId(jobId);
    setShowShortlistModal(true);
  };

  const handleShortlistSubmit = () => {
    setShowShortlistModal(false);
    setSelectedJobId(null);
    loadDashboardData(); // Refresh data
  };

  const getJobApplications = (jobId) => {
    return applications.filter(app => parseInt(app.jobId) === jobId);
  };

  const getJobShortlistRequests = (jobId) => {
    return shortlistRequests.filter(req => parseInt(req.jobId) === jobId);
  };

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(job => job.status === "active").length,
    totalApplications: applications.length,
    pendingRequests: shortlistRequests.filter(req => req.status === "pending").length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
            <Loading type="cards" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadDashboardData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Employer Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your job postings and track applications
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate("/employers/post-job")}
            className="mt-4 sm:mt-0"
          >
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="Briefcase" className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="Play" className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-info-100 to-info-200 rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="Users" className="h-6 w-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-warning-100 to-warning-200 rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="Clock" className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Job Postings</h2>
            <Button
              variant="outline"
              onClick={() => navigate("/jobs")}
            >
              <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
              View Public Jobs
            </Button>
          </div>

          {jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job) => {
                const jobApplications = getJobApplications(job.Id);
                const jobShortlistRequests = getJobShortlistRequests(job.Id);

                return (
                  <Card key={job.Id} className="p-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
                            {job.title}
                          </h3>
                          <Badge variant={job.status === "active" ? "success" : "default"}>
                            {job.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center text-gray-600 text-sm mb-3 gap-4">
                          <div className="flex items-center">
                            <ApperIcon name="MapPin" className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <ApperIcon name="Briefcase" className="h-4 w-4 mr-1" />
                            {job.jobType}
                          </div>
                          <div className="flex items-center">
                            <ApperIcon name="DollarSign" className="h-4 w-4 mr-1" />
                            {job.salaryRange}
                          </div>
                          <div className="flex items-center">
                            <ApperIcon name="Calendar" className="h-4 w-4 mr-1" />
                            Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <ApperIcon name="Users" className="h-4 w-4 mr-1 text-info" />
                            <span className="font-medium">{jobApplications.length} Applications</span>
                          </div>
                          <div className="flex items-center">
                            <ApperIcon name="ListChecks" className="h-4 w-4 mr-1 text-warning" />
                            <span className="font-medium">{jobShortlistRequests.length} Shortlist Requests</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/job/${job.Id}`)}
                        >
                          <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleRequestShortlist(job.Id)}
                        >
                          <ApperIcon name="UserCheck" className="h-4 w-4 mr-2" />
                          Request Shortlist
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Empty
              title="No jobs posted yet"
              description="Start by posting your first job to attract qualified candidates."
              actionLabel="Post Your First Job"
              onAction={() => navigate("/employers/post-job")}
              icon="Briefcase"
            />
          )}
        </div>

        {/* Recent Applications */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Applications</h2>
          
          {applications.length > 0 ? (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.slice(0, 10).map((application) => {
                      const job = jobs.find(j => j.Id === parseInt(application.jobId));
                      
                      return (
                        <tr key={application.Id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {application.candidateName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {application.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {job ? job.title : "Unknown Job"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {job ? job.company : ""}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDistanceToNow(new Date(application.submittedDate), { addSuffix: true })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={
                              application.status === "submitted" ? "info" :
                              application.status === "under-review" ? "warning" :
                              application.status === "shortlisted" ? "success" : "default"
                            }>
                              {application.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Empty
              title="No applications yet"
              description="Once candidates start applying to your jobs, you'll see them here."
              icon="Users"
            />
          )}
        </div>
      </div>

      {/* Shortlist Request Modal */}
      <ShortlistRequestModal
        isOpen={showShortlistModal}
        onClose={() => setShowShortlistModal(false)}
        onSubmit={handleShortlistSubmit}
        jobId={selectedJobId}
        jobs={jobs}
      />
    </div>
  );
};

export default EmployerDashboard;