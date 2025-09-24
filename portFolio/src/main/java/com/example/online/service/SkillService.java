package com.example.online.service;


import org.springframework.stereotype.Service;

import com.example.online.Entity.Skill;
import com.example.online.Repository.SkillRepository;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    // Create
    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    // Update
    public Skill updateSkill(Long id, Skill skillDetails) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        skill.setIconUrl(skillDetails.getIconUrl());
        skill.setTitle(skillDetails.getTitle());
        skill.setPercentage(skillDetails.getPercentage());
        skill.setCategory(skillDetails.getCategory());
        skill.setCertificationLink(skillDetails.getCertificationLink());

        return skillRepository.save(skill);
    }

    // Delete
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }

    // Get by ID
    public Skill getSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
    }

    // Get all
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // Get by category
    public List<Skill> getSkillsByCategory(String category) {
        return skillRepository.findByCategory(category);
    }
}
