import React from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isOpen, onClose }) => {
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
    { value: "education", label: "Education" }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:shadow-none
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        transition-transform duration-300 ease-in-out
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Mobile close button */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ApperIcon name="X" className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden lg:block mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filter Jobs</h2>
          </div>

          <div className="space-y-6">
            <FormField
              label="Location"
              name="location"
              value={filters.location}
              onChange={onFilterChange}
              placeholder="Enter city or state"
            />

            <FormField
              type="select"
              label="Job Type"
              name="jobType"
              value={filters.jobType}
              onChange={onFilterChange}
              options={jobTypes}
              placeholder="Select job type"
            />

            <FormField
              type="select"
              label="Experience Level"
              name="experienceLevel"
              value={filters.experienceLevel}
              onChange={onFilterChange}
              options={experienceLevels}
              placeholder="Select experience level"
            />

            <FormField
              type="select"
              label="Industry"
              name="industry"
              value={filters.industry}
              onChange={onFilterChange}
              options={industries}
              placeholder="Select industry"
            />

            <FormField
              label="Min Salary"
              name="minSalary"
              type="number"
              value={filters.minSalary}
              onChange={onFilterChange}
              placeholder="Enter minimum salary"
            />

            <FormField
              label="Max Salary"
              name="maxSalary"
              type="number"
              value={filters.maxSalary}
              onChange={onFilterChange}
              placeholder="Enter maximum salary"
            />

            <Button 
              variant="outline" 
              className="w-full"
              onClick={onClearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;