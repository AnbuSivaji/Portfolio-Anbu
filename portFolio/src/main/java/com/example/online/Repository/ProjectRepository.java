package com.example.online.Repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.online.Entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}

