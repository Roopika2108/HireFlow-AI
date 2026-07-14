package com.hireflow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hireflow.entity.SavedJob;
import com.hireflow.service.SavedJobService;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin(origins = "*")
public class SavedJobController {

    @Autowired
    private SavedJobService savedJobService;

    // Save a Job
    @PostMapping
    public SavedJob saveJob(@RequestBody SavedJob savedJob) {
        return savedJobService.saveJob(savedJob);
    }

    // View Saved Jobs of a User
    @GetMapping("/user/{userId}")
    public List<SavedJob> getSavedJobs(@PathVariable Long userId) {
        return savedJobService.getSavedJobs(userId);
    }

    // Remove Saved Job
    @DeleteMapping("/{id}")
    public String removeSavedJob(@PathVariable Long id) {
        savedJobService.removeSavedJob(id);
        return "Saved Job Removed Successfully";
    }
}