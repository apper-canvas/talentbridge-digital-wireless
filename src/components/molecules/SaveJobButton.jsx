import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import * as savedJobsService from '@/services/api/savedJobsService';

const SaveJobButton = ({ jobId, variant = 'ghost', size = 'sm', className = '' }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkSavedStatus();
  }, [jobId]);

  const checkSavedStatus = async () => {
    try {
      const saved = await savedJobsService.isJobSaved(jobId);
      setIsSaved(saved);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;

    setLoading(true);
    try {
      if (isSaved) {
        await savedJobsService.deleteSavedJob(jobId);
        setIsSaved(false);
        toast.success('Job removed from saved list');
      } else {
        await savedJobsService.create(jobId);
        setIsSaved(true);
        toast.success('Job saved successfully');
      }
    } catch (error) {
      console.error('Error toggling save status:', error);
      toast.error(isSaved ? 'Failed to remove job' : 'Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleSave}
      disabled={loading}
      className={className}
      aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
    >
      <ApperIcon
        name="Heart"
        className={`h-4 w-4 ${isSaved ? 'fill-primary-500 text-primary-500' : ''}`}
      />
      {size === 'lg' && (
        <span className="ml-2">
          {isSaved ? 'Saved' : 'Save Job'}
        </span>
      )}
    </Button>
  );
};

export default SaveJobButton;