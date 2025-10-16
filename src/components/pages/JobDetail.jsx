import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import SaveJobButton from "@/components/molecules/SaveJobButton";
import ApplicationModal from "@/components/organisms/ApplicationModal";
import { jobService } from "@/services/api/jobService";
import { formatDistanceToNow } from "date-fns";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const loadJob = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobService.getById(parseInt(id));
      if (data) {
        setJob(data);
      } else {
        setError("Job not found");
      }
    } catch (err) {
      setError("Failed to load job details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJob();
  }, [id]);

  const handleApplyClick = () => {
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = () => {
    setShowApplicationModal(false);
  };

  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time":
        return "success";
      case "part-time":
        return "warning";
      case "contract":
        return "info";
      default:
        return "default";
    }
  };

  const getExperienceLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "entry-level":
        return "success";
      case "mid-level":
        return "primary";
      case "senior-level":
        return "warning";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading type="detail" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadJob} />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message="Job not found" onRetry={loadJob} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/jobs")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>

        <Card className="overflow-hidden">
          {/* Job Header */}
          <div className="bg-gradient-to-r from-primary-50 to-white p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {job.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <ApperIcon name="Building2" className="h-5 w-5 mr-2" />
                  <span className="text-lg font-medium">{job.company}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <ApperIcon name="MapPin" className="h-5 w-5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant={getJobTypeColor(job.jobType)}>
                    {job.jobType}
                  </Badge>
                  <Badge variant={getExperienceLevelColor(job.experienceLevel)}>
                    {job.experienceLevel}
                  </Badge>
                  <Badge variant="default">
                    {job.industry}
                  </Badge>
                </div>
              </div>
              <div className="md:text-right">
                <div className="text-2xl font-bold text-primary mb-2">
                  {job.salaryRange}
                </div>
                <div className="text-gray-500 mb-4">
                  Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
                </div>
<div className="flex items-center gap-3">
                  <SaveJobButton jobId={job.Id} variant="outline" size="lg" />
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleApplyClick}
                    className="w-full md:w-auto"
                  >
                    <ApperIcon name="Send" className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Job Content */}
          <div className="p-8">
            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Job Type</h3>
                <p className="text-gray-900 font-medium">{job.jobType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Experience Level</h3>
                <p className="text-gray-900 font-medium">{job.experienceLevel}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Industry</h3>
                <p className="text-gray-900 font-medium">{job.industry}</p>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>
              <div className="text-gray-700 leading-relaxed">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <ApperIcon name="Check" className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Benefits & Perks
                </h2>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <ApperIcon name="Star" className="h-5 w-5 text-warning mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Interested in this position?
                </h3>
                <p className="text-gray-600 mb-6">
                  Submit your application and we'll get back to you within 2-3 business days.
                </p>
<div className="flex items-center gap-3">
                  <SaveJobButton jobId={job.Id} variant="outline" size="lg" />
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleApplyClick}
                  >
                    <ApperIcon name="Send" className="h-5 w-5 mr-2" />
                    Apply for this Job
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApplicationSubmit}
        job={job}
      />
    </div>
  );
};

export default JobDetail;