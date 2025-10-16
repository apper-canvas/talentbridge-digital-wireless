import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const StatusTimeline = ({ currentStatus, className }) => {
  const statuses = [
    {
      key: "submitted",
      label: "Application Submitted",
      description: "Your application has been received",
      icon: "Send"
    },
    {
      key: "under-review",
      label: "Under Review",
      description: "Our team is reviewing your application",
      icon: "Eye"
    },
    {
      key: "shortlisted",
      label: "Shortlisted",
      description: "Congratulations! You've been shortlisted",
      icon: "CheckCircle"
    },
    {
      key: "interview",
      label: "Interview Scheduled",
      description: "Interview details will be shared soon",
      icon: "Calendar"
    }
  ];

  const getCurrentStatusIndex = () => {
    return statuses.findIndex(status => status.key === currentStatus);
  };

  const currentIndex = getCurrentStatusIndex();

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        {statuses.map((status, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={status.key} className="relative flex items-start pb-8 last:pb-0">
              {/* Connector line */}
              {index < statuses.length - 1 && (
                <div className={cn(
                  "absolute left-4 top-8 w-0.5 h-8",
                  isActive ? "bg-accent" : "bg-gray-200"
                )} />
              )}
              
              {/* Status icon */}
              <div className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-full border-2 mr-4 transition-all duration-200",
                isActive 
                  ? "bg-accent border-accent text-white" 
                  : "bg-white border-gray-200 text-gray-400",
                isCurrent && "ring-4 ring-accent-100 scale-110"
              )}>
                <ApperIcon name={status.icon} className="h-4 w-4" />
              </div>
              
              {/* Status content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <p className={cn(
                    "text-sm font-medium",
                    isActive ? "text-gray-900" : "text-gray-500"
                  )}>
                    {status.label}
                  </p>
                  {isCurrent && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                      Current
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-sm mt-1",
                  isActive ? "text-gray-600" : "text-gray-400"
                )}>
                  {status.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;