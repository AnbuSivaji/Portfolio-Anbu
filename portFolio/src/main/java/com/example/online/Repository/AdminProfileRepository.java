package com.example.online.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.online.Entity.AdminProfile;

@Repository
public interface AdminProfileRepository extends JpaRepository<AdminProfile, Long> {
}
