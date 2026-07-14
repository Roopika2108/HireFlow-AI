package com.hireflow.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SavedJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long jobId;

    public SavedJob() {
    }

    public SavedJob(Long id, Long userId, Long jobId) {
        this.id = id;
        this.userId = userId;
        this.jobId = jobId;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }
}