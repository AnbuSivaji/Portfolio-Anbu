package com.example.online.service;

import java.util.List;

import com.example.online.Entity.AdminProfile;

public interface AdminProfileService {
    AdminProfile createProfile(AdminProfile profile);
    AdminProfile updateProfile(Long id, AdminProfile profile);
    void deleteProfile(Long id);
    AdminProfile getProfileById(Long id);
    List<AdminProfile> getAllProfiles();
}
