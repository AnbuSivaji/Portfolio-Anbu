package com.example.online.service;


import org.springframework.stereotype.Service;

import com.example.online.Entity.Project;
import com.example.online.Repository.ProjectRepository;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // Create Project
    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    // Get All Projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Get Single Project
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    // Update Project
    public Project updateProject(Long id, Project updatedProject) {
        Project existing = getProjectById(id);
        existing.setTitle(updatedProject.getTitle());
        existing.setDescription(updatedProject.getDescription());
        existing.setLink(updatedProject.getLink());
        existing.setImageUrl(updatedProject.getImageUrl());
        return projectRepository.save(existing);
    }

    // Delete Project
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}

