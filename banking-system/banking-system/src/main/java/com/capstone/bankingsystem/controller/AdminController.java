package com.capstone.bankingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.capstone.bankingsystem.model.User;
import com.capstone.bankingsystem.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    //  NEW: Get all users (ADMIN only)
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    //  Existing: Activate / Deactivate user
    @PutMapping("/users/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUserStatus(
            @PathVariable String id,
            @RequestParam boolean active
    ) {
        User updatedUser = userService.updateUserStatus(id, active);
        return ResponseEntity.ok(updatedUser);
    }
}
