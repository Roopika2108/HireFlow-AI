package com.hireflow.service;

import java.util.List;

import com.hireflow.entity.Application;

public interface ApplicationService {

    // Candidate applies for a job
    Application applyJob(Application application);

    // View all applications
    List<Application> getAllApplications();

    // View one application
    Application getApplicationById(Long id);

    List<Application> getApplicationsByUser(Long userId);
    
    // Delete an application
    Application updateApplicationStatus(Long id, String status);
    void deleteApplication(Long id);
    
}