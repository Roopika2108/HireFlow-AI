package com.hireflow.service;

import java.util.List;

import com.hireflow.entity.SavedJob;

public interface SavedJobService {

    SavedJob saveJob(SavedJob savedJob);

    List<SavedJob> getSavedJobs(Long userId);

    boolean isJobSaved(Long userId, Long jobId);

    void removeSavedJob(Long id);
}