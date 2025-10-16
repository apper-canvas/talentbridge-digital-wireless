import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import FileUpload from "@/components/molecules/FileUpload";
import StatusTimeline from "@/components/molecules/StatusTimeline";
import ApperIcon from "@/components/ApperIcon";
import { applicationService } from "@/services/api/applicationService";

const ApplicationModal = ({ isOpen, onClose, onSubmit, job }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeFile: null
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 3;

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

  const handleFileSelect = (file) => {
    setFormData(prev => ({
      ...prev,
      resumeFile: file
    }));
    
    if (errors.resumeFile) {
      setErrors(prev => ({
        ...prev,
        resumeFile: ""
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.candidateName.trim()) {
        newErrors.candidateName = "Full name is required";
      }
      
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      }
    }

    if (step === 2) {
      if (!formData.resumeFile) {
        newErrors.resumeFile = "Resume is required";
      }
      
      if (!formData.coverLetter.trim()) {
        newErrors.coverLetter = "Cover letter is required";
      } else if (formData.coverLetter.trim().length < 50) {
        newErrors.coverLetter = "Cover letter must be at least 50 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) {
      return;
    }

    try {
      setLoading(true);

      const applicationData = {
        jobId: job.Id.toString(),
        candidateName: formData.candidateName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        coverLetter: formData.coverLetter.trim(),
        resumeUrl: `uploads/resumes/${formData.resumeFile.name}`, // Simulated file path
        status: "submitted",
        submittedDate: new Date().toISOString()
      };

      await applicationService.create(applicationData);
      toast.success("Application submitted successfully! We'll be in touch within 2-3 business days.");
      
      setCurrentStep(3);
      
      // Reset form and close after showing success
      setTimeout(() => {
        resetForm();
        onSubmit();
      }, 3000);
      
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
      console.error("Error submitting application:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      candidateName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resumeFile: null
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Apply for {job?.title}
            </h2>
            <p className="text-gray-600">{job?.company} • {job?.location}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-primary-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <FormField
                    label="Full Name"
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleInputChange}
                    error={errors.candidateName}
                    placeholder="John Smith"
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="john@example.com"
                  />
                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Application Materials
                </h3>
                <div className="space-y-6">
                  <FileUpload
                    label="Upload Resume"
                    description="Upload your resume in PDF, DOC, or DOCX format (max 5MB)"
                    onFileSelect={handleFileSelect}
                    selectedFile={formData.resumeFile}
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize={5}
                  />
                  {errors.resumeFile && (
                    <p className="text-sm text-red-600">{errors.resumeFile}</p>
                  )}
                  
                  <FormField
                    type="textarea"
                    label="Cover Letter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    error={errors.coverLetter}
                    placeholder="Tell us why you're interested in this position and how your experience makes you a great fit..."
                    rows={6}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center mx-auto">
                <ApperIcon name="CheckCircle" className="h-8 w-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in the {job?.title} position at {job?.company}. 
                  We've received your application and will review it carefully.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">What happens next?</h4>
                <StatusTimeline currentStatus="submitted" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {currentStep < 3 && (
          <div className="flex justify-between items-center p-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? handleClose : handlePrevious}
            >
              {currentStep === 1 ? "Cancel" : "Previous"}
            </Button>
            
            {currentStep < 2 ? (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;