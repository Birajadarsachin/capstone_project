package com.capstone.bankingsystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.capstone.bankingsystem.model.CreditRequest;

@Repository
public interface CreditRequestRepository extends MongoRepository<CreditRequest, String> {

    List<CreditRequest> findBySubmittedBy(String submittedBy);
}
