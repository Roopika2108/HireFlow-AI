package com.hireflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hireflow.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByJobTitleContainingIgnoreCase(String jobTitle);

    List<Job> findByLocationContainingIgnoreCase(String location);

    List<Job> findByCompanyNameContainingIgnoreCase(String companyName);
}