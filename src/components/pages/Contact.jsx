import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import TextArea from "@/components/atoms/TextArea";
import FormField from "@/components/molecules/FormField";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: 'general',
    subject: '',
    message: ''
  });
  
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [consultationData, setConsultationData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [consultationLoading, setConsultationLoading] = useState(false);
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [consultationErrors, setConsultationErrors] = useState({});

  const contactTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "job-seeker", label: "Job Seeker Support" },
    { value: "employer", label: "Employer Services" },
    { value: "partnership", label: "Partnership Opportunity" }
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateConsultationForm = () => {
    const newErrors = {};

    if (!consultationData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!consultationData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultationData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!consultationData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!consultationData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    }

    if (!consultationData.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required';
    }

    setConsultationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thank you for your message! We'll get back to you within 24 hours.");
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        type: 'general',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateConsultationForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setConsultationLoading(true);

    try {
      // Simulate API call - store consultation request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for now (can be replaced with actual API call)
      const consultationRequests = JSON.parse(localStorage.getItem('consultationRequests') || '[]');
      const newRequest = {
        Id: consultationRequests.length + 1,
        ...consultationData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      consultationRequests.push(newRequest);
      localStorage.setItem('consultationRequests', JSON.stringify(consultationRequests));

      setConsultationSuccess(true);
      toast.success('Consultation request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit consultation request. Please try again.');
    } finally {
      setConsultationLoading(false);
    }
  };

const handleConsultationChange = (e) => {
    const { name, value } = e.target;
    setConsultationData(prev => ({
      ...prev,
      [name]: value
    }));
    if (consultationErrors[name]) {
      setConsultationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetConsultationModal = () => {
    setShowConsultationModal(false);
    setConsultationSuccess(false);
    setConsultationData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setConsultationErrors({});
  };
  const contactInfo = [
    {
      icon: "Phone",
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Monday - Friday, 9AM - 6PM EST"
    },
    {
      icon: "Mail",
      title: "Email",
      value: "hello@talentbridge.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: "MapPin",
      title: "Office",
      value: "123 Business Center Dr, Suite 100",
      description: "New York, NY 10001"
    },
    {
      icon: "Clock",
      title: "Support Hours",
      value: "Mon - Fri: 9AM - 6PM EST",
      description: "Closed weekends and holidays"
    }
  ];

  const officeLocations = [
    {
      city: "New York",
      address: "123 Business Center Dr, Suite 100, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@talentbridge.com"
    },
    {
      city: "San Francisco",
      address: "456 Tech Park Blvd, Floor 12, San Francisco, CA 94105",
      phone: "+1 (555) 987-6543",
      email: "sf@talentbridge.com"
    },
    {
      city: "Chicago",
      address: "789 Commerce Plaza, Unit 500, Chicago, IL 60601",
      phone: "+1 (555) 456-7890",
      email: "chicago@talentbridge.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our services? Need help with your job search or hiring needs? 
            We're here to help. Reach out to us anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    placeholder="John Smith"
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="john@company.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Phone (Optional)"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                  <FormField
                    label="Company (Optional)"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company Name"
                  />
                </div>

                <FormField
                  type="select"
                  label="Inquiry Type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  options={contactTypes}
                />

                <FormField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  error={errors.subject}
                  placeholder="How can we help you?"
                />

                <FormField
                  type="textarea"
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  error={errors.message}
                  placeholder="Please provide details about your inquiry..."
                  rows={5}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <ApperIcon name={info.icon} className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{info.title}</div>
                      <div className="text-gray-900">{info.value}</div>
                      <div className="text-sm text-gray-500">{info.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
<Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('Company brochure download started!');
                    // Simulate brochure download
                    const link = document.createElement('a');
                    link.href = 'data:application/pdf;base64,';
                    link.download = 'TalentBridge-Company-Brochure.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <ApperIcon name="FileText" className="h-4 w-4 mr-2" />
                  Download Company Brochure
                </Button>
<Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowConsultationModal(true)}
                >
                  <ApperIcon name="Calendar" size={20} className="mr-3 text-primary" />
                  Schedule a Consultation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.info(
                      'Live chat is coming soon! For immediate assistance, please email us at contact@talentbridge.com or call +1 (555) 123-4567.',
                      { autoClose: 5000 }
                    );
                  }}
                >
                  <ApperIcon name="MessageCircle" className="h-4 w-4 mr-2" />
                  Live Chat Support
                </Button>
              </div>
            </Card>

{/* Social Media */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <ApperIcon name="Facebook" className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                >
                  <ApperIcon name="Twitter" className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
                >
                  <ApperIcon name="Linkedin" className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
                >
                  <ApperIcon name="Instagram" className="h-5 w-5" />
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Locations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((location, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Building2" className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {location.city} Office
                </h3>
                <div className="text-gray-600 space-y-2">
                  <div className="flex items-start justify-center">
                    <ApperIcon name="MapPin" className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                    <span className="text-sm">{location.address}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <ApperIcon name="Phone" className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">{location.phone}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <ApperIcon name="Mail" className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">{location.email}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation Request Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {consultationSuccess ? 'Request Submitted!' : 'Schedule a Consultation'}
                </h3>
                <button
                  onClick={resetConsultationModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ApperIcon name="X" size={24} />
                </button>
              </div>

              {consultationSuccess ? (
                <div className="text-center py-8">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <ApperIcon name="Check" size={32} className="text-green-600" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Consultation Request Received
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest! Our team will review your request and contact you within 24 hours to confirm your consultation appointment.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h5 className="font-semibold text-blue-900 mb-2">What happens next?</h5>
                    <ul className="text-sm text-blue-800 space-y-1 text-left">
                      <li>• We'll review your preferred date and time</li>
                      <li>• A team member will contact you to confirm</li>
                      <li>• You'll receive a calendar invitation</li>
                      <li>• Consultation details will be sent via email</li>
                    </ul>
                  </div>
                  <Button onClick={resetConsultationModal} className="w-full">
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleConsultationSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={consultationData.name}
                        onChange={handleConsultationChange}
                        placeholder="John Doe"
                        error={consultationErrors.name}
                      />
                      {consultationErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{consultationErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={consultationData.email}
                        onChange={handleConsultationChange}
                        placeholder="john@example.com"
                        error={consultationErrors.email}
                      />
                      {consultationErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{consultationErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={consultationData.phone}
                        onChange={handleConsultationChange}
                        placeholder="+1 (555) 123-4567"
                        error={consultationErrors.phone}
                      />
                      {consultationErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">{consultationErrors.phone}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date *
                        </label>
                        <Input
                          type="date"
                          name="preferredDate"
                          value={consultationData.preferredDate}
                          onChange={handleConsultationChange}
                          min={new Date().toISOString().split('T')[0]}
                          error={consultationErrors.preferredDate}
                        />
                        {consultationErrors.preferredDate && (
                          <p className="mt-1 text-sm text-red-600">{consultationErrors.preferredDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Time *
                        </label>
                        <select
                          name="preferredTime"
                          value={consultationData.preferredTime}
                          onChange={handleConsultationChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                            consultationErrors.preferredTime ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select time</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                        </select>
                        {consultationErrors.preferredTime && (
                          <p className="mt-1 text-sm text-red-600">{consultationErrors.preferredTime}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Details (Optional)
                      </label>
                      <TextArea
                        name="message"
                        value={consultationData.message}
                        onChange={handleConsultationChange}
                        placeholder="Tell us about your hiring needs, challenges, or any specific topics you'd like to discuss..."
                        rows={4}
                      />
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <ApperIcon name="Info" size={20} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-gray-600">
                          Our consultation sessions typically last 30-45 minutes. We'll discuss your recruitment needs, 
                          demonstrate our platform features, and answer any questions you may have.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetConsultationModal}
                      disabled={consultationLoading}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={consultationLoading}
                      className="flex-1"
                    >
                      {consultationLoading ? (
                        <>
                          <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <ApperIcon name="Send" size={20} className="mr-2" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Card>
</div>
      )}
    </div>
  );
}