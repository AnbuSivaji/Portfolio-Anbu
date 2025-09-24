package com.example.online.service;



import org.springframework.stereotype.Service;

import com.example.online.Entity.AdminProfile;
import com.example.online.Repository.AdminProfileRepository;

import java.util.List;

@Service
public class AdminProfileServiceImpl implements AdminProfileService {

    private final AdminProfileRepository profileRepository;

    public AdminProfileServiceImpl(AdminProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public AdminProfile createProfile(AdminProfile profile) {
        return profileRepository.save(profile);
    }

    @Override
    public AdminProfile updateProfile(Long id, AdminProfile profile) {
        AdminProfile existing = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        existing.setImageUrl(profile.getImageUrl());
        existing.setAboutMe(profile.getAboutMe());
        existing.setTitle(profile.getTitle());
        existing.setBio(profile.getBio());
        existing.setResumeUrl(profile.getResumeUrl());

        return profileRepository.save(existing);
    }

    @Override
    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }

    @Override
    public AdminProfile getProfileById(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    @Override
    public List<AdminProfile> getAllProfiles() {
        return profileRepository.findAll();
    }
}
