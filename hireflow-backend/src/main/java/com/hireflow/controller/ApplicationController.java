package com.hireflow.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hireflow.entity.Application;
import com.hireflow.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public Application applyJob(@RequestBody Application application) {
        return applicationService.applyJob(application);
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/user/{userId}")
    public List<Application> getApplicationsByUser(@PathVariable Long userId) {
        return applicationService.getApplicationsByUser(userId);
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id);
    }
    
    @PutMapping("/{id}/status")
    public Application updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return applicationService.updateApplicationStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return "Application Deleted Successfully";
    }

    @PostMapping("/upload/{applicationId}")
    public String uploadResume(@PathVariable Long applicationId,
                               @RequestParam("file") MultipartFile file) throws IOException {

        Application application = applicationService.getApplicationById(applicationId);

        if (application == null) {
            return "Application not found";
        }

        String uploadDir = "D:/HireFlow-AI/hireflow-backend/uploads/";

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        File destination = new File(uploadDir, fileName);

        file.transferTo(destination);

        application.setResumePath(fileName);
        applicationService.applyJob(application);

        return "Resume uploaded successfully: " + fileName;
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadResume(@PathVariable String fileName) throws IOException {

        Path path = Paths.get("D:/HireFlow-AI/hireflow-backend/uploads/")
                .resolve(fileName);

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
}