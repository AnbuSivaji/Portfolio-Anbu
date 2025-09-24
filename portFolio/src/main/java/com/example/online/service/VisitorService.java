package com.example.online.service;



import org.springframework.stereotype.Service;

import com.example.online.Entity.Visitor;
import com.example.online.Repository.VisitorRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;

    public VisitorService(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    public Visitor trackVisitor(String ipAddress, String pageType) {
        return visitorRepository.findByIpAddressAndPageType(ipAddress, pageType)
                .orElseGet(() -> {
                    Visitor visitor = new Visitor(ipAddress, pageType);
                    visitor.setVisitedAt(LocalDateTime.now());
                    return visitorRepository.save(visitor);
                });
    }

    public long getTotalVisitors() {
        return visitorRepository.count();
    }

    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }
}
