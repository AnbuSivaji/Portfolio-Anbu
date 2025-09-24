package com.example.online.controller;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import com.example.online.Entity.Visitor;
import com.example.online.service.VisitorService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/visitors")
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorController {

    private final VisitorService visitorService;

    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    // 🔹 Track visitor
    @PostMapping("/track/{pageType}")
    public Visitor trackVisitor(@PathVariable String pageType, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        return visitorService.trackVisitor(ipAddress, pageType);
    }

    // 🔹 Get total count
    @GetMapping("/count")
    public long getTotalVisitors() {
        return visitorService.getTotalVisitors();
    }

    // 🔹 Get all visitors list
    @GetMapping
    public List<Visitor> getAllVisitors() {
        return visitorService.getAllVisitors();
    }
}
