package com.example.online.service;


import org.springframework.stereotype.Service;

import com.example.online.Entity.Education;
import com.example.online.Repository.EducationRepository;

import java.util.List;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public Education addEducation(Education education) {
        return educationRepository.save(education);
    }

    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

    public Education getEducationById(Long id) {
        return educationRepository.findById(id).orElseThrow(() -> new RuntimeException("Education not found"));
    }

    public Education updateEducation(Long id, Education updatedEducation) {
        Education existing = educationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found"));

        existing.setInstitutionName(updatedEducation.getInstitutionName());
        existing.setInstitutionImageUrl(updatedEducation.getInstitutionImageUrl());
        existing.setStartYear(updatedEducation.getStartYear());
        existing.setEndYear(updatedEducation.getEndYear());
        existing.setDescription(updatedEducation.getDescription());
        existing.setType(updatedEducation.getType());

        return educationRepository.save(existing);
    }

    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);
    }
}
