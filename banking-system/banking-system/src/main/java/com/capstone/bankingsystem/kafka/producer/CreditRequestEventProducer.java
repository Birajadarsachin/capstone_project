package com.capstone.bankingsystem.kafka.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.capstone.bankingsystem.kafka.event.CreditRequestEvent;

@Service
public class CreditRequestEventProducer {

    private static final String TOPIC = "credit-request-events";

    private final KafkaTemplate<String, CreditRequestEvent> kafkaTemplate;

    public CreditRequestEventProducer(
            KafkaTemplate<String, CreditRequestEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishEvent(CreditRequestEvent event) {
        kafkaTemplate.send(TOPIC, event);
    }
}
