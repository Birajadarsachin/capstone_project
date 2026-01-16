package com.capstone.bankingsystem.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.capstone.bankingsystem.model.Client;
import com.capstone.bankingsystem.service.ClientService;

@RestController
@RequestMapping("/api/rm")
public class ClientController {

    @Autowired
    private ClientService clientService;

    // RM: Create client
    @PostMapping("/clients")
    //@PreAuthorize("hasRole('RELATIONSHIP_MANAGER')")
    public ResponseEntity<Client> createClient(
            @Valid @RequestBody Client client,
            Authentication authentication
    ) {
        String rmUsername = authentication.getName();
        Client created = clientService.createClient(client, rmUsername);
        return ResponseEntity.ok(created);
    }

    // RM: View own clients
    @GetMapping("/clients")
    //@PreAuthorize("hasRole('RELATIONSHIP_MANAGER')")
    public ResponseEntity<List<Client>> getMyClients(Authentication authentication) {
        String rmUsername = authentication.getName();
        return ResponseEntity.ok(clientService.getClientsForRm(rmUsername));
    }

    // RM: Get client details
    @GetMapping("/clients/{id}")
    //@PreAuthorize("hasRole('RELATIONSHIP_MANAGER')")
    public ResponseEntity<Client> getClient(@PathVariable String id) {
        return ResponseEntity.ok(clientService.getClientById(id));
    }

    // RM: Update client
    @PutMapping("/clients/{id}")
    //@PreAuthorize("hasRole('RELATIONSHIP_MANAGER')")
    public ResponseEntity<Client> updateClient(
            @PathVariable String id,
            @Valid @RequestBody Client client
    ) {
        return ResponseEntity.ok(clientService.updateClient(id, client));
    }
}
