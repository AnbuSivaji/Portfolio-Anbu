package com.example.online.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.online.Entity.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}

