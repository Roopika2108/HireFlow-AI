package com.hireflow.service;

import java.util.List;

import com.hireflow.entity.Job;

public interface JobService {

    Job createJob(Job job);

    List<Job> getAllJobs();

    Job getJobById(Long id);

    Job updateJob(Long id, Job job);

    void deleteJob(Long id);

    List<Job> searchByTitle(String title);

    List<Job> searchByLocation(String location);

    List<Job> searchByCompany(String companyName);
}