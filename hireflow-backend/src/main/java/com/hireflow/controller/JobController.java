package com.hireflow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hireflow.entity.Job;
import com.hireflow.service.JobService;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    // Create Job
    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }

    // View All Jobs
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // View One Job
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // Update Job
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job) {
        return jobService.updateJob(id, job);
    }

    // Delete Job
    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return "Job Deleted Successfully";
    }
    
    @GetMapping("/search/title")
    public List<Job> searchByTitle(@RequestParam String title) {
        return jobService.searchByTitle(title);
    }

    @GetMapping("/search/location")
    public List<Job> searchByLocation(@RequestParam String location) {
        return jobService.searchByLocation(location);
    }

    @GetMapping("/search/company")
    public List<Job> searchByCompany(@RequestParam String companyName) {
        return jobService.searchByCompany(companyName);
    }
}