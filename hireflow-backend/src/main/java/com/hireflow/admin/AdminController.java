package com.hireflow.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hireflow.entity.Application;
import com.hireflow.entity.Job;
import com.hireflow.entity.User;
import com.hireflow.repository.ApplicationRepository;
import com.hireflow.repository.JobRepository;
import com.hireflow.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    // Admin Dashboard Statistics
    @GetMapping("/stats")
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("totalUsers", userRepository.count());
        stats.put("totalJobs", jobRepository.count());
        stats.put("totalApplications", applicationRepository.count());

        return stats;
    }

    // View All Users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Delete User
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "User Deleted Successfully";
    }

    // View All Jobs
    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Delete Job
    @DeleteMapping("/jobs/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
        return "Job Deleted Successfully";
    }

    // View All Applications
    @GetMapping("/applications")
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
}