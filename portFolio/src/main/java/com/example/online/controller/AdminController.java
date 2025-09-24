package com.example.online.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.online.Entity.Admin;
import com.example.online.security.JwtUtil;
import com.example.online.service.AdminService;

@RestController
@RequestMapping("/api/admin")
//@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AdminController(AdminService adminService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
                           AuthenticationManager authenticationManager) {
        this.adminService = adminService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody Admin admin) {
        if (adminService.findByEmail(admin.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        Admin created = adminService.registerAdmin(admin);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            Admin admin = adminService.findByEmail(request.getEmail());
            String token = jwtUtil.generateToken(admin.getEmail(), admin.getRole());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    static class AuthResponse {
        private String token;
        public AuthResponse(String token) { this.token = token; }
        public String getToken() { return token; }
    }
}
