package com.example.online.service;

import com.example.online.Entity.Admin;
import com.example.online.Repository.AdminRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ Signup - register new admin
    public Admin registerAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole("ROLE_ADMIN");
        return adminRepository.save(admin);
    }

    // ✅ Find admin by email
    public Admin findByEmail(String email) {
        return adminRepository.findByEmail(email).orElse(null);
    }

    // ✅ Needed for AuthenticationManager
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with email: " + email));

        return User.withUsername(admin.getEmail())
                .password(admin.getPassword())
                .roles("ADMIN") // This automatically adds ROLE_ADMIN
                .build();
    }
}
