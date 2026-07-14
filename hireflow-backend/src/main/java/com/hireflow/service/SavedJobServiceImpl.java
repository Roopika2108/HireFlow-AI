package com.hireflow.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hireflow.entity.SavedJob;
import com.hireflow.repository.SavedJobRepository;

@Service
public class SavedJobServiceImpl implements SavedJobService {

    @Autowired
    private SavedJobRepository savedJobRepository;

    @Override
    public SavedJob saveJob(SavedJob savedJob) {

        boolean alreadySaved = savedJobRepository.existsByUserIdAndJobId(
                savedJob.getUserId(),
                savedJob.getJobId()
        );

        if (alreadySaved) {
            return null;
        }

        return savedJobRepository.save(savedJob);
    }

    @Override
    public List<SavedJob> getSavedJobs(Long userId) {
        return savedJobRepository.findByUserId(userId);
    }

    @Override
    public boolean isJobSaved(Long userId, Long jobId) {
        return savedJobRepository.existsByUserIdAndJobId(userId, jobId);
    }

    @Override
    public void removeSavedJob(Long id) {
        savedJobRepository.deleteById(id);
    }
}