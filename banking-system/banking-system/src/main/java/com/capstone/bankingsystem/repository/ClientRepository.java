package com.capstone.bankingsystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.capstone.bankingsystem.model.Client;

@Repository
public interface ClientRepository extends MongoRepository<Client, String> {

    List<Client> findByRmId(String rmId);

    List<Client> findByRmIdAndCompanyNameContainingIgnoreCase(String rmId, String companyName);

    List<Client> findByRmIdAndIndustryContainingIgnoreCase(String rmId, String industry);
}
