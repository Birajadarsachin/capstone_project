package com.capstone.bankingsystem.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.capstone.bankingsystem.exception.ResourceNotFoundException;
import com.capstone.bankingsystem.model.Client;
import com.capstone.bankingsystem.repository.ClientRepository;

@ExtendWith(MockitoExtension.class)
class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientService clientService;

    @Test
    void createClient_shouldSetRmIdAndSave() {
        Client client = new Client();
        client.setCompanyName("ABC Ltd");

        when(clientRepository.save(any(Client.class))).thenReturn(client);

        Client saved = clientService.createClient(client, "rm1");

        assertEquals("rm1", saved.getRmId());
        verify(clientRepository, times(1)).save(client);
    }

    @Test
    void getClientsForRm_shouldReturnClientList() {
        Client client = new Client();
        client.setRmId("rm1");

        when(clientRepository.findByRmId("rm1"))
                .thenReturn(List.of(client));

        List<Client> result = clientService.getClientsForRm("rm1");

        assertEquals(0, result.size());
        verify(clientRepository).findByRmId("rm1");
    }

    @Test
    void getClientById_whenFound_shouldReturnClient() {
        Client client = new Client();
        client.setId("123");

        when(clientRepository.findById("123"))
                .thenReturn(Optional.of(client));

        Client result = clientService.getClientById("123");

        assertEquals("123", result.getId());
    }

    @Test
    void getClientById_whenNotFound_shouldThrowException() {
        when(clientRepository.findById("999"))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> clientService.getClientById("999")
        );
    }

    @Test
    void updateClient_shouldUpdateFieldsAndSave() {
        Client existing = new Client();
        existing.setId("1");

        Client updated = new Client();
        updated.setCompanyName("Updated Co");
        updated.setIndustry("IT");
        updated.setAddress("Pune");
        updated.setPrimaryContactName("John");
        updated.setPrimaryContactEmail("john@test.com");
        updated.setPrimaryContactPhone("9999999999");
        updated.setAnnualTurnover(50.0);
        updated.setDocumentsSubmitted(true);

        when(clientRepository.findById("1"))
                .thenReturn(Optional.of(existing));
        when(clientRepository.save(any(Client.class)))
                .thenReturn(existing);

        Client result = clientService.updateClient("0", updated);

        assertEquals("Updated Co", result.getCompanyName());
        assertEquals("IT", result.getIndustry());
        verify(clientRepository).save(existing);
    }
}
