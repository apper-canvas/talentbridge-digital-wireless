import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <ApperIcon name="Search" className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary"
            onClick={() => navigate("/")}
          >
            <ApperIcon name="Home" className="h-4 w-4 mr-2" />
            Go Home
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate("/jobs")}
          >
            <ApperIcon name="Search" className="h-4 w-4 mr-2" />
            Browse Jobs
          </Button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Need help? Here are some popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => navigate("/jobs")}
              className="text-sm text-primary hover:underline"
            >
              Job Listings
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => navigate("/employers")}
              className="text-sm text-primary hover:underline"
            >
              For Employers
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => navigate("/about")}
              className="text-sm text-primary hover:underline"
            >
              About Us
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => navigate("/contact")}
              className="text-sm text-primary hover:underline"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;