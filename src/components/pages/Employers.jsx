import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Employers = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "Users",
      title: "Access Top Talent",
      description: "Browse through 50,000+ qualified professionals across various industries and experience levels."
    },
    {
      icon: "Zap",
      title: "Quick Posting",
      description: "Post your job openings in minutes with our streamlined job posting process."
    },
    {
      icon: "Target",
      title: "Curated Shortlists",
      description: "Request curated candidate shortlists from our placement experts to save time on screening."
    },
    {
      icon: "BarChart3",
      title: "Analytics & Insights",
      description: "Track your job performance with detailed analytics and candidate engagement metrics."
    },
    {
      icon: "Shield",
      title: "Verified Candidates",
      description: "All candidates are verified for authenticity and skills to ensure quality matches."
    },
    {
      icon: "Clock",
      title: "24/7 Support",
      description: "Get dedicated support from our placement specialists whenever you need assistance."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small businesses and startups",
      features: [
        "Post up to 3 jobs per month",
        "Basic candidate search",
        "Email support",
        "Standard job visibility"
      ],
      cta: "Get Started",
      featured: false
    },
    {
      name: "Professional",
      price: "$99/month",
      description: "Ideal for growing companies",
      features: [
        "Unlimited job postings",
        "Advanced candidate search",
        "Priority support",
        "Featured job listings",
        "Candidate shortlist requests",
        "Analytics dashboard"
      ],
      cta: "Start Free Trial",
      featured: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific needs",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "White-label solutions",
        "Advanced analytics",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      featured: false
    }
  ];

  const stats = [
    { number: "5,000+", label: "Companies Trust Us" },
    { number: "50,000+", label: "Active Candidates" },
    { number: "95%", label: "Successful Placements" },
    { number: "48hrs", label: "Average Response Time" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find the Right Talent
              <span className="block bg-gradient-to-r from-accent to-accent-600 bg-clip-text text-transparent">
                Faster Than Ever
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with qualified candidates instantly. Post jobs, get curated shortlists, 
              and hire the perfect talent for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="xl"
                onClick={() => navigate("/employers/post-job")}
              >
                <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
                Post Your First Job
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate("/employers/dashboard")}
              >
                <ApperIcon name="BarChart3" className="h-5 w-5 mr-2" />
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent-600 bg-clip-text text-transparent mb-2">
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
              Why Choose TalentBridge for Hiring?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make hiring simple, efficient, and effective with tools designed for modern recruitment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} className="h-6 w-6 text-accent" />
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

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a startup or enterprise, we have the perfect plan to meet your hiring needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 text-center relative ${
                  plan.featured 
                    ? "ring-2 ring-accent shadow-xl scale-105" 
                    : "hover:shadow-lg"
                } transition-all duration-300`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-accent to-accent-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {plan.price}
                </div>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>

                <ul className="text-left space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <ApperIcon name="Check" className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.featured ? "primary" : "outline"}
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/employers/post-job")}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 3-step process gets you connected with top talent quickly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Post Your Job
              </h3>
              <p className="text-gray-600">
                Create a detailed job posting with requirements, benefits, and company information in minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Applications
              </h3>
              <p className="text-gray-600">
                Receive applications from qualified candidates or request curated shortlists from our team.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-info to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Hire Top Talent
              </h3>
              <p className="text-gray-600">
                Interview and hire the best candidates with our streamlined communication tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Next Great Hire?
          </h2>
          <p className="text-xl text-accent-100 mb-8">
            Join thousands of companies that have found success with TalentBridge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/employers/post-job")}
            >
              Post a Job Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-accent"
              onClick={() => navigate("/employers/dashboard")}
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employers;