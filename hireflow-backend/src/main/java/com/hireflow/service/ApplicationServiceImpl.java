package com.hireflow.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hireflow.entity.Application;
import com.hireflow.repository.ApplicationRepository;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Application applyJob(Application application) {
        return applicationRepository.save(application);
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    @Override
    public List<Application> getApplicationsByUser(Long userId) {
        return applicationRepository.findByUserId(userId);
    }
    
    @Override
    public Application updateApplicationStatus(Long id, String status) {

        Application application = applicationRepository.findById(id).orElse(null);

        if (application != null) {
            application.setStatus(status);
            return applicationRepository.save(application);
        }

        return null;
    }
    
    @Override
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}