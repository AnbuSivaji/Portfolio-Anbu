package com.example.online.service;


import org.springframework.stereotype.Service;

import com.example.online.Entity.Experience;
import com.example.online.Repository.ExperienceRepository;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public Experience addExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    public Experience updateExperience(Long id, Experience updated) {
        return experienceRepository.findById(id)
                .map(exp -> {
                    exp.setCompanyName(updated.getCompanyName());
                    exp.setRole(updated.getRole());
                    exp.setStartDate(updated.getStartDate());
                    exp.setEndDate(updated.getEndDate());
                    exp.setDescription(updated.getDescription());
                    exp.setCompanyImageUrl(updated.getCompanyImageUrl());
                    exp.setCertificateUrl(updated.getCertificateUrl());
                    return experienceRepository.save(exp);
                }).orElseThrow(() -> new RuntimeException("Experience not found"));
    }

    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }
}

