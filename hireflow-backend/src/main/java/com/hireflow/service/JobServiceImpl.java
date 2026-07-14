package com.hireflow.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hireflow.entity.Job;
import com.hireflow.repository.JobRepository;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @Override
    public Job updateJob(Long id, Job job) {

        Job existingJob = jobRepository.findById(id).orElse(null);

        if (existingJob != null) {
            existingJob.setJobTitle(job.getJobTitle());
            existingJob.setCompanyName(job.getCompanyName());
            existingJob.setLocation(job.getLocation());
            existingJob.setExperience(job.getExperience());
            existingJob.setSalary(job.getSalary());
            existingJob.setJobType(job.getJobType());
            existingJob.setDescription(job.getDescription());

            return jobRepository.save(existingJob);
        }

        return null;
    }

    @Override
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    @Override
    public List<Job> searchByTitle(String title) {
        return jobRepository.findByJobTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Job> searchByLocation(String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    @Override
    public List<Job> searchByCompany(String companyName) {
        return jobRepository.findByCompanyNameContainingIgnoreCase(companyName);
    }
}