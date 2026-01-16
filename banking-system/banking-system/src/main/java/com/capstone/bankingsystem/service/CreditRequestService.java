package com.capstone.bankingsystem.service;

import java.util.List;

import com.capstone.bankingsystem.kafka.event.CreditRequestEvent;
import com.capstone.bankingsystem.kafka.producer.CreditRequestEventProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.bankingsystem.exception.ResourceNotFoundException;
import com.capstone.bankingsystem.model.CreditRequest;
import com.capstone.bankingsystem.repository.CreditRequestRepository;

@Service
public class CreditRequestService {

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private CreditRequestEventProducer eventProducer;


    public CreditRequest createRequest(CreditRequest request, String rmUsername) {
        request.setSubmittedBy(rmUsername);
        CreditRequest saved = creditRequestRepository.save(request);

        eventProducer.publishEvent(
                new CreditRequestEvent(
                        "CREDIT_REQUEST_CREATED",
                        saved.getId(),
                        saved.getSubmittedBy(),
                        saved.getStatus()
                )
        );

        return saved;
    }


    public List<CreditRequest> getRequests(String role, String username) {
        if ("ANALYST".equals(role)) {
            return creditRequestRepository.findAll();
        }
        return creditRequestRepository.findBySubmittedBy(username);
    }

    public CreditRequest getById(String id) {
        return creditRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Credit request not found"));
    }

    public CreditRequest updateStatus(String id, String status, String remarks) {
        CreditRequest req = getById(id);
        req.setStatus(status);
        req.setRemarks(remarks);

        CreditRequest updated = creditRequestRepository.save(req);

        eventProducer.publishEvent(
                new CreditRequestEvent(
                        "CREDIT_REQUEST_STATUS_UPDATED",
                        updated.getId(),
                        updated.getSubmittedBy(),
                        updated.getStatus()
                )
        );

        return updated;
    }

}
