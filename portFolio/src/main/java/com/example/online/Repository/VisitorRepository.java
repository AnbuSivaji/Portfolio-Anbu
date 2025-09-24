package com.example.online.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.online.Entity.Visitor;

import java.util.Optional;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    Optional<Visitor> findByIpAddressAndPageType(String ipAddress, String pageType);
}

