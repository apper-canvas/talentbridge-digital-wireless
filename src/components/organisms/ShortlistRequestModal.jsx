import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { shortlistService } from "@/services/api/shortlistService";

const ShortlistRequestModal = ({ isOpen, onClose, onSubmit, jobId, jobs }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobId: jobId || "",
    numberOfCandidates: "",
    urgency: "",
    criteria: "",
    additionalNotes: ""
  });
  const [errors, setErrors] = useState({});

  const selectedJob = jobs.find(job => job.Id === parseInt(formData.jobId));

  const urgencyOptions = [
    { value: "low", label: "Low - Within 2 weeks" },
    { value: "medium", label: "Medium - Within 1 week" },
    { value: "high", label: "High - Within 3 days" },
    { value: "urgent", label: "Urgent - ASAP" }
  ];

  const handleInputChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobId) {
      newErrors.jobId = "Please select a job";
    }

    if (!formData.numberOfCandidates) {
      newErrors.numberOfCandidates = "Number of candidates is required";
    } else if (parseInt(formData.numberOfCandidates) < 1) {
      newErrors.numberOfCandidates = "Must request at least 1 candidate";
    } else if (parseInt(formData.numberOfCandidates) > 20) {
      newErrors.numberOfCandidates = "Maximum 20 candidates per request";
    }

    if (!formData.urgency) {
      newErrors.urgency = "Please select urgency level";
    }

    if (!formData.criteria.trim()) {
      newErrors.criteria = "Candidate criteria is required";
    } else if (formData.criteria.trim().length < 20) {
      newErrors.criteria = "Please provide more detailed criteria (at least 20 characters)";
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

      const requestData = {
        employerId: "1", // Simulated employer ID
        jobId: formData.jobId,
        criteria: formData.criteria.trim(),
        numberOfCandidates: parseInt(formData.numberOfCandidates),
        urgency: formData.urgency,
        additionalNotes: formData.additionalNotes.trim(),
        status: "pending",
        requestDate: new Date().toISOString()
      };

      await shortlistService.create(requestData);
      toast.success("Shortlist request submitted successfully! Our team will review and get back to you soon.");
      
      resetForm();
      onSubmit();
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
      console.error("Error submitting shortlist request:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      jobId: jobId || "",
      numberOfCandidates: "",
      urgency: "",
      criteria: "",
      additionalNotes: ""
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Update jobId when prop changes
  React.useEffect(() => {
    if (jobId) {
      setFormData(prev => ({
        ...prev,
        jobId: jobId.toString()
      }));
    }
  }, [jobId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Request Candidate Shortlist
            </h2>
            <p className="text-gray-600">
              Let our team curate qualified candidates for your position
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Job Selection */}
            <FormField
              type="select"
              label="Select Job"
              name="jobId"
              value={formData.jobId}
              onChange={handleInputChange}
              error={errors.jobId}
              options={jobs.map(job => ({
                value: job.Id.toString(),
                label: `${job.title} - ${job.company}`
              }))}
              placeholder="Choose a job posting"
            />

            {selectedJob && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Selected Position:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Title:</strong> {selectedJob.title}</div>
                  <div><strong>Company:</strong> {selectedJob.company}</div>
                  <div><strong>Location:</strong> {selectedJob.location}</div>
                  <div><strong>Job Type:</strong> {selectedJob.jobType}</div>
                  <div><strong>Experience Level:</strong> {selectedJob.experienceLevel}</div>
                </div>
              </div>
            )}

            {/* Request Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Number of Candidates"
                name="numberOfCandidates"
                type="number"
                value={formData.numberOfCandidates}
                onChange={handleInputChange}
                error={errors.numberOfCandidates}
                placeholder="5"
                min="1"
                max="20"
              />
              
              <FormField
                type="select"
                label="Urgency Level"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                error={errors.urgency}
                options={urgencyOptions}
                placeholder="Select urgency"
              />
            </div>

            {/* Candidate Criteria */}
            <FormField
              type="textarea"
              label="Specific Candidate Criteria"
              name="criteria"
              value={formData.criteria}
              onChange={handleInputChange}
              error={errors.criteria}
              placeholder="Please describe the specific qualifications, skills, experience level, or other criteria you're looking for in candidates. Be as detailed as possible to help us find the best matches..."
              rows={5}
            />

            {/* Additional Notes */}
            <FormField
              type="textarea"
              label="Additional Notes (Optional)"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              placeholder="Any additional information that might help us find the right candidates..."
              rows={3}
            />

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <ApperIcon name="Info" className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <strong>How it works:</strong> Our placement specialists will review your request 
                  and manually curate a list of qualified candidates from our database. You'll 
                  receive the shortlist with candidate profiles and contact information within 
                  the specified timeframe.
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-6">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <ApperIcon name="UserCheck" className="h-4 w-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShortlistRequestModal;