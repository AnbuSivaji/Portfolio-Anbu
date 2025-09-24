package com.example.online.Repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.online.Entity.Skill;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    // Custom queries
    List<Skill> findByCategory(String category); // eg: "skills" or "certifications"
}
