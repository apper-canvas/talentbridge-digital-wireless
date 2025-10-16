import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "Search",
      title: "Smart Job Matching",
      description: "Our advanced algorithm matches you with opportunities that align with your skills and career goals."
    },
    {
      icon: "Users",
      title: "Quality Employers",
      description: "Connect with top-tier companies and employers who value talent and offer growth opportunities."
    },
    {
      icon: "Zap",
      title: "Quick Applications",
      description: "Apply to multiple jobs with just a few clicks using your saved profile and resume."
    },
    {
      icon: "Shield",
      title: "Secure & Private",
      description: "Your information is protected with enterprise-grade security and privacy controls."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Jobs" },
    { number: "5,000+", label: "Companies" },
    { number: "50,000+", label: "Job Seekers" },
    { number: "98%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content: "TalentBridge helped me find my dream job in just 2 weeks. The process was smooth and the support was exceptional.",
      avatar: "👩‍💻"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "GrowthCo",
      content: "As an employer, I've found amazing talent through TalentBridge. The candidate quality is outstanding.",
      avatar: "👨‍💼"
    },
    {
      name: "Lisa Thompson",
      role: "Data Analyst",
      company: "DataFlow",
      content: "The personalized job matching saved me hours of searching. I got interviews with companies I actually wanted to work for.",
      avatar: "👩‍💼"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bridge the Gap Between
              <span className="block bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
                Talent & Opportunity
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Whether you're seeking your next career move or looking for exceptional talent, 
              TalentBridge connects the right people with the right opportunities.
            </p>
          </div>

          {/* Dual Path Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* For Job Seekers */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="User" className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                I'm Looking for a Job
              </h3>
              <p className="text-gray-600 mb-6">
                Discover thousands of opportunities from top employers. Upload your resume and get matched with jobs that fit your skills and aspirations.
              </p>
              <ul className="text-left text-gray-600 mb-8 space-y-2">
                <li className="flex items-center">
                  <ApperIcon name="Check" className="h-5 w-5 text-accent mr-3" />
                  Browse 10,000+ active job listings
                </li>
                <li className="flex items-center">
                  <ApperIcon name="Check" className="h-5 w-5 text-accent mr-3" />
                  Get personalized job recommendations
                </li>
                <li className="flex items-center">
                  <ApperIcon name="Check" className="h-5 w-5 text-accent mr-3" />
                  Track your application status
                </li>
              </ul>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={() => navigate("/jobs")}
              >
                Browse Jobs
              </Button>
            </Card>

            {/* For Employers */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Building2" className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                I'm Hiring Talent
              </h3>
              <p className="text-gray-600 mb-6">
                Find qualified candidates quickly and efficiently. Post jobs and request curated shortlists from our placement experts.
              </p>
              <ul className="text-left text-gray-600 mb-8 space-y-2">
                <li className="flex items-center">
                  <ApperIcon name="Check" className="h-5 w-5 text-accent mr-3" />
                  Post unlimited job openings
                </li>
                <li className="flex items-center">
                  <ApperIcon name="Check" className="h-5 w-5 text-accent mr-3" />
                  Get curated candidate shortlists
                </li>
                <li className="flex items-center">
                  <ApperIcon name="Check" className="h-5 w-5 text-accent mr-3" />
                  Access to 50,000+ professionals
                </li>
              </ul>
              <Button 
                variant="success" 
                size="lg" 
                className="w-full"
                onClick={() => navigate("/employers")}
              >
                Post a Job
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TalentBridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a job board. We're your career partner, dedicated to making meaningful connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from professionals who found their perfect match.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of professionals who have found success through TalentBridge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate("/jobs")}
            >
              Start Job Search
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate("/employers/post-job")}
            >
              Post a Job
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;