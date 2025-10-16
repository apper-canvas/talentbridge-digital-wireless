import React, { useCallback } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FileUpload = ({ 
  onFileSelect, 
  acceptedTypes = ".pdf,.doc,.docx",
  maxSize = 5,
  className,
  label = "Upload Resume",
  description = "Upload your resume in PDF, DOC, or DOCX format (max 5MB)",
  selectedFile
}) => {
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileSelection = (file) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!acceptedTypes.split(",").some(type => type.trim() === fileExtension)) {
      alert("Please upload a PDF, DOC, or DOCX file");
      return;
    }

    onFileSelect(file);
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors duration-200 bg-gradient-to-br from-gray-50 to-white"
      >
        <input
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {selectedFile ? (
          <div className="space-y-3">
            <div className="mx-auto w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center">
              <ApperIcon name="FileCheck" className="h-8 w-8 text-accent-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <Button variant="outline" size="sm" type="button">
              Change File
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <ApperIcon name="Upload" className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your file here, or <span className="text-primary">browse</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;