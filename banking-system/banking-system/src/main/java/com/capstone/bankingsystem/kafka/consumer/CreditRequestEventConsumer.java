package com.capstone.bankingsystem.kafka.consumer;



import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.capstone.bankingsystem.kafka.event.CreditRequestEvent;

@Service
public class CreditRequestEventConsumer {

    @KafkaListener(
            topics = "credit-request-events",
            groupId = "credit-request-group"
    )
    public void consume(CreditRequestEvent event) {
        System.out.println(
                "Kafka Event Received -> " +
                        "Type: " + event.getEventType() +
                        ", CreditRequestId: " + event.getCreditRequestId() +
                        ", SubmittedBy: " + event.getSubmittedBy() +
                        ", Status: " + event.getStatus() +
                        ", Time: " + event.getTimestamp()
        );
    }
}
