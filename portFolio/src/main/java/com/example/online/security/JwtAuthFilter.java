package com.example.online.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);
    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                if (jwtUtil.validateToken(token)) {
                    String email = jwtUtil.extractEmail(token);
                    String roleClaim = jwtUtil.extractRole(token); // e.g. "ROLE_ADMIN" or "ADMIN"

                    if (email != null && roleClaim != null) {
                        // Normalize role so we don't create ROLE_ROLE_ADMIN
                        String normalizedRole = roleClaim.startsWith("ROLE_") ? roleClaim : "ROLE_" + roleClaim;

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        email,
                                        null,
                                        Collections.singleton(new SimpleGrantedAuthority(normalizedRole))
                                );

                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        logger.debug("JWT valid — user: {}, authority: {}", email, normalizedRole);
                    } else {
                        logger.debug("JWT missing email or role claim");
                    }
                } else {
                    logger.debug("JWT invalid/expired");
                }
            } catch (Exception ex) {
                logger.warn("JWT processing failed: {}", ex.getMessage());
            }
        } // else: no Authorization header -> anonymous

        filterChain.doFilter(request, response);
    }
}
