package com.capstone.bankingsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.bankingsystem.exception.ResourceNotFoundException;
import com.capstone.bankingsystem.model.Client;
import com.capstone.bankingsystem.repository.ClientRepository;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Client createClient(Client client, String rmId) {
        client.setRmId(rmId);
        return clientRepository.save(client);
    }

    public List<Client> getClientsForRm(String rmId) {
        return clientRepository.findAll();
    }
    public Client getClientById(String id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
    }

    public Client updateClient(String id, Client updated) {
        Client existing = getClientById(id);

        existing.setCompanyName(updated.getCompanyName());
        existing.setIndustry(updated.getIndustry());
        existing.setAddress(updated.getAddress());
        existing.setPrimaryContactName(updated.getPrimaryContactName());
        existing.setPrimaryContactEmail(updated.getPrimaryContactEmail());
        existing.setPrimaryContactPhone(updated.getPrimaryContactPhone());
        existing.setAnnualTurnover(updated.getAnnualTurnover());
        existing.setDocumentsSubmitted(updated.getDocumentsSubmitted());

        return clientRepository.save(existing);
    }
}
