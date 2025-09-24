package com.example.online.controller;

import com.example.online.Entity.AdminProfile;
import com.example.online.service.AdminProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/profiles")
@CrossOrigin(origins = "http://localhost:5173") // frontend (React/Vite) URL ku match panna
public class AdminProfileController {

    private final AdminProfileService profileService;

    // Constructor injection (best practice)
    public AdminProfileController(AdminProfileService profileService) {
        this.profileService = profileService;
    }

    // ✅ Create profile
    @PostMapping
    public ResponseEntity<AdminProfile> createProfile(@RequestBody AdminProfile profile) {
        AdminProfile savedProfile = profileService.createProfile(profile);
        return new ResponseEntity<>(savedProfile, HttpStatus.CREATED);
    }

    // ✅ Update profile by ID
    @PutMapping("/{id}")
    public ResponseEntity<AdminProfile> updateProfile(@PathVariable Long id, @RequestBody AdminProfile profile) {
        AdminProfile updatedProfile = profileService.updateProfile(id, profile);
        return ResponseEntity.ok(updatedProfile);
    }

    // ✅ Delete profile by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        profileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Get profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdminProfile> getProfileById(@PathVariable Long id) {
        AdminProfile profile = profileService.getProfileById(id);
        return ResponseEntity.ok(profile);
    }

    // ✅ Get all profiles
    @GetMapping
    public ResponseEntity<List<AdminProfile>> getAllProfiles() {
        List<AdminProfile> profiles = profileService.getAllProfiles();
        return ResponseEntity.ok(profiles);
    }
}
