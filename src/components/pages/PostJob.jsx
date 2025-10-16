import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { jobService } from "@/services/api/jobService";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    industry: "",
    salaryRange: "",
    description: "",
    requirements: "",
    benefits: ""
  });

  const [errors, setErrors] = useState({});

  const jobTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" }
  ];

  const experienceLevels = [
    { value: "entry-level", label: "Entry Level" },
    { value: "mid-level", label: "Mid Level" },
    { value: "senior-level", label: "Senior Level" },
    { value: "executive", label: "Executive" }
  ];

  const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "education", label: "Education" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "retail", label: "Retail" },
    { value: "consulting", label: "Consulting" },
    { value: "other", label: "Other" }
  ];

  const handleInputChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.jobType) {
      newErrors.jobType = "Job type is required";
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Experience level is required";
    }

    if (!formData.industry) {
      newErrors.industry = "Industry is required";
    }

    if (!formData.salaryRange.trim()) {
      newErrors.salaryRange = "Salary range is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Job description must be at least 50 characters";
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = "Requirements are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);

      const jobData = {
        title: formData.title.trim(),
        company: formData.company.trim(),
        location: formData.location.trim(),
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        industry: formData.industry,
        salaryRange: formData.salaryRange.trim(),
        description: formData.description.trim(),
        requirements: formData.requirements.split('\n').filter(req => req.trim()).map(req => req.trim()),
        benefits: formData.benefits ? formData.benefits.split('\n').filter(benefit => benefit.trim()).map(benefit => benefit.trim()) : [],
        status: "active",
        postedDate: new Date().toISOString()
      };

      await jobService.create(jobData);
      toast.success("Job posted successfully!");
      navigate("/employers/dashboard");
    } catch (error) {
      toast.error("Failed to post job. Please try again.");
      console.error("Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/employers")}
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Back to Employers
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-600">
            Fill out the details below to attract the best candidates for your position.
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={errors.title}
                  placeholder="e.g. Senior Software Engineer"
                />
                <FormField
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  error={errors.company}
                  placeholder="e.g. TechCorp Inc."
                />
                <FormField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  error={errors.location}
                  placeholder="e.g. New York, NY or Remote"
                />
                <FormField
                  label="Salary Range"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleInputChange}
                  error={errors.salaryRange}
                  placeholder="e.g. $80,000 - $120,000"
                />
              </div>
            </div>

            {/* Job Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  type="select"
                  label="Job Type"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  error={errors.jobType}
                  options={jobTypes}
                  placeholder="Select job type"
                />
                <FormField
                  type="select"
                  label="Experience Level"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  error={errors.experienceLevel}
                  options={experienceLevels}
                  placeholder="Select experience level"
                />
                <FormField
                  type="select"
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  error={errors.industry}
                  options={industries}
                  placeholder="Select industry"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>
              <FormField
                type="textarea"
                label="Job Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                rows={6}
              />
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Requirements
              </h2>
              <FormField
                type="textarea"
                label="Requirements (one per line)"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                error={errors.requirements}
                placeholder="Bachelor's degree in Computer Science&#10;3+ years of experience with React&#10;Strong communication skills"
                rows={5}
              />
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Benefits (Optional)
              </h2>
              <FormField
                type="textarea"
                label="Benefits & Perks (one per line)"
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                error={errors.benefits}
                placeholder="Health insurance&#10;401(k) matching&#10;Flexible work schedule&#10;Professional development budget"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    Posting Job...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" className="h-4 w-4 mr-2" />
                    Post Job
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate("/employers")}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;