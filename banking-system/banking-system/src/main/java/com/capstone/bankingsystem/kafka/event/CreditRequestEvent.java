package com.capstone.bankingsystem.kafka.event;

import java.time.LocalDateTime;

public class CreditRequestEvent {

    private String eventType; // CREATED or STATUS_UPDATED
    private String creditRequestId;
    private String submittedBy;
    private String status;
    private LocalDateTime timestamp;

    public CreditRequestEvent() {}

    public CreditRequestEvent(String eventType, String creditRequestId,
                              String submittedBy, String status) {
        this.eventType = eventType;
        this.creditRequestId = creditRequestId;
        this.submittedBy = submittedBy;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }

    // getters & setters

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getCreditRequestId() {
        return creditRequestId;
    }

    public void setCreditRequestId(String creditRequestId) {
        this.creditRequestId = creditRequestId;
    }

    public String getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
