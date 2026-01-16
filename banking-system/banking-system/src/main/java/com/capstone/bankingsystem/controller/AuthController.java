package com.capstone.bankingsystem.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.bankingsystem.dto.LoginRequest;
import com.capstone.bankingsystem.dto.LoginResponse;
import com.capstone.bankingsystem.dto.RegisterRequest;
import com.capstone.bankingsystem.model.User;
import com.capstone.bankingsystem.security.JwtUtil;
import com.capstone.bankingsystem.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    // LOGIN API
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        String token = jwtUtil.generateToken(userDetails);

        String role = userDetails.getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        return ResponseEntity.ok(
                new LoginResponse(
                        token,
                        userDetails.getUsername(),
                        role
                )
        );
    }

    // REGISTER API (ADMIN ONLY)
    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        User createdUser = userService.createUser(request);
        return ResponseEntity.ok(createdUser);
    }
}
