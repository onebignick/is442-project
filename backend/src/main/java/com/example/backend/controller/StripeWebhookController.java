package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.repository.ProductRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class StripeWebhookController {
    private final ProductRepository productRepository;

    public StripeWebhookController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostMapping("/api/webhook/stripe")
    public String handleStripeWebhook(@RequestBody String stripeWebhookEvent) {
        //TODO: process POST request
        
        return stripeWebhookEvent;
    }
    
    
}
