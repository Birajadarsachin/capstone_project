package com.capstone.bankingsystem.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.capstone.bankingsystem.model.CreditRequest;
import com.capstone.bankingsystem.service.CreditRequestService;

@RestController
@RequestMapping("/api/credit-requests")
public class CreditRequestController {

    @Autowired
    private CreditRequestService creditRequestService;

    // RM: create credit request
    @PostMapping
    @PreAuthorize("hasRole('RELATIONSHIP_MANAGER')")
    public ResponseEntity<CreditRequest> create(
            @Valid @RequestBody CreditRequest request,
            Authentication authentication
    ) {
        String rmUsername = authentication.getName();
        return ResponseEntity.ok(
                creditRequestService.createRequest(request, rmUsername)
        );
    }

    // RM: own requests | Analyst: all requests
    @GetMapping
    @PreAuthorize("hasAnyRole('RELATIONSHIP_MANAGER','ANALYST')")
    public ResponseEntity<List<CreditRequest>> getAll(Authentication authentication) {

        String role = authentication.getAuthorities()
                .iterator().next().getAuthority().replace("ROLE_", "");

        String username = authentication.getName();

        return ResponseEntity.ok(
                creditRequestService.getRequests(role, username)
        );
    }

    // Get request details
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('RELATIONSHIP_MANAGER','ANALYST')")
    public ResponseEntity<CreditRequest> getById(@PathVariable String id) {
        return ResponseEntity.ok(creditRequestService.getById(id));
    }

    // Analyst: update status & remarks
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ANALYST')")
    public ResponseEntity<CreditRequest> updateStatus(
            @PathVariable String id,
            @RequestParam String status,
            @RequestParam(required = false) String remarks
    ) {
        return ResponseEntity.ok(
                creditRequestService.updateStatus(id, status, remarks)
        );
    }
}
