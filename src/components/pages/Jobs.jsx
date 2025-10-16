import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/molecules/SearchBar";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import JobCard from "@/components/molecules/JobCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { jobService } from "@/services/api/jobService";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experienceLevel: "",
    industry: "",
    minSalary: "",
    maxSalary: ""
  });

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobService.getAll();
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    let filtered = [...jobs];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.jobType) {
      filtered = filtered.filter(job => job.jobType === filters.jobType);
    }

    if (filters.experienceLevel) {
      filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    if (filters.industry) {
      filtered = filtered.filter(job => job.industry === filters.industry);
    }

    if (filters.minSalary) {
      filtered = filtered.filter(job => {
        const salaryNumber = parseInt(job.salaryRange.replace(/[^0-9]/g, ""));
        return salaryNumber >= parseInt(filters.minSalary);
      });
    }

    if (filters.maxSalary) {
      filtered = filtered.filter(job => {
        const salaryNumber = parseInt(job.salaryRange.replace(/[^0-9]/g, ""));
        return salaryNumber <= parseInt(filters.maxSalary);
      });
    }

    // Apply sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
    } else if (sortBy === "salary-high") {
      filtered.sort((a, b) => {
        const salaryA = parseInt(a.salaryRange.replace(/[^0-9]/g, ""));
        const salaryB = parseInt(b.salaryRange.replace(/[^0-9]/g, ""));
        return salaryB - salaryA;
      });
    } else if (sortBy === "salary-low") {
      filtered.sort((a, b) => {
        const salaryA = parseInt(a.salaryRange.replace(/[^0-9]/g, ""));
        const salaryB = parseInt(b.salaryRange.replace(/[^0-9]/g, ""));
        return salaryA - salaryB;
      });
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, filters, sortBy]);

  const handleFilterChange = (value, name) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      location: "",
      jobType: "",
      experienceLevel: "",
      industry: "",
      minSalary: "",
      maxSalary: ""
    });
    setSearchQuery("");
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "salary-high", label: "Salary: High to Low" },
    { value: "salary-low", label: "Salary: Low to High" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex lg:gap-8">
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <Loading type="cards" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadJobs} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-gray-600">
            Discover {jobs.length} opportunities from top companies
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by job title, company, or keywords..."
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setIsFilterOpen(true)}
            >
              <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex lg:gap-8">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isOpen={false}
              onClose={() => {}}
            />
          </div>
{/* Mobile Filter Sidebar */}
          <div className="lg:hidden">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
              </p>
              <Button
                variant="primary"
                onClick={() => navigate("/employers/post-job")}
              >
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Post Job
              </Button>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.Id} job={job} />
                ))}
              </div>
            ) : (
              <Empty
                title="No jobs found"
                description="Try adjusting your search criteria or clear the filters to see more results."
                actionLabel="Clear Filters"
                onAction={handleClearFilters}
                icon="Search"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;