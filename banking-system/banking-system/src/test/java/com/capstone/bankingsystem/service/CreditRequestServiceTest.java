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
import com.capstone.bankingsystem.model.CreditRequest;
import com.capstone.bankingsystem.repository.CreditRequestRepository;

@ExtendWith(MockitoExtension.class)
class CreditRequestServiceTest {

    @Mock
    private CreditRequestRepository creditRequestRepository;

    @InjectMocks
    private CreditRequestService creditRequestService;

    @Test
    void createRequest_shouldSetSubmittedByAndSave() {
        CreditRequest request = new CreditRequest();

        when(creditRequestRepository.save(any(CreditRequest.class)))
                .thenReturn(request);

        CreditRequest saved =
                creditRequestService.createRequest(request, "rm1");

        assertEquals("rm1", saved.getSubmittedBy());
        verify(creditRequestRepository).save(request);
    }

    @Test
    void getRequests_whenAnalyst_shouldReturnAll() {
        when(creditRequestRepository.findAll())
                .thenReturn(List.of(new CreditRequest()));

        List<CreditRequest> result =
                creditRequestService.getRequests("ANALYST", "any");

        assertEquals(1, result.size());
        verify(creditRequestRepository).findAll();
    }

    @Test
    void getRequests_whenRm_shouldReturnOwn() {
        when(creditRequestRepository.findBySubmittedBy("rm1"))
                .thenReturn(List.of(new CreditRequest()));

        List<CreditRequest> result =
                creditRequestService.getRequests("RELATIONSHIP_MANAGER", "rm1");

        assertEquals(1, result.size());
        verify(creditRequestRepository).findBySubmittedBy("rm1");
    }

    @Test
    void getById_whenFound_shouldReturnRequest() {
        CreditRequest req = new CreditRequest();
        req.setId("1");

        when(creditRequestRepository.findById("1"))
                .thenReturn(Optional.of(req));

        CreditRequest result = creditRequestService.getById("1");

        assertEquals("1", result.getId());
    }

    @Test
    void getById_whenNotFound_shouldThrowException() {
        when(creditRequestRepository.findById("99"))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> creditRequestService.getById("99")
        );
    }

    @Test
    void updateStatus_shouldUpdateAndSave() {
        CreditRequest req = new CreditRequest();
        req.setId("1");

        when(creditRequestRepository.findById("1"))
                .thenReturn(Optional.of(req));
        when(creditRequestRepository.save(any()))
                .thenReturn(req);

        CreditRequest updated =
                creditRequestService.updateStatus("1", "Approved", "OK");

        assertEquals("Approved", updated.getStatus());
        assertEquals("OK", updated.getRemarks());
        verify(creditRequestRepository).save(req);
    }
}
