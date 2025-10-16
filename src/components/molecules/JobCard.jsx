import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import SaveJobButton from "@/components/molecules/SaveJobButton";
import { formatDistanceToNow } from "date-fns";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleViewJob = () => {
    navigate(`/job/${job.Id}`);
  };

  const getJobTypeColor = (type) => {
    switch (type.toLowerCase()) {
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
    switch (level.toLowerCase()) {
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

  return (
    <Card hover className="p-6 cursor-pointer" onClick={handleViewJob}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <ApperIcon name="Building2" className="h-4 w-4 mr-2" />
            <span className="font-medium">{job.company}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <ApperIcon name="MapPin" className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary mb-1">
            {job.salaryRange}
          </div>
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
          </div>
        </div>
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

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job.description.substring(0, 120)}...
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <ApperIcon name="Clock" className="h-4 w-4 mr-1" />
          <span>Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
        </div>
<div className="flex items-center gap-2">
          <SaveJobButton jobId={job.Id} variant="ghost" size="sm" />
          <Button variant="primary" size="sm" onClick={handleViewJob}>
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;