package com.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Price;
import com.backend.repository.PriceRepository;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class PriceController {
    private final PriceRepository priceRepository;

    public PriceController(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    @GetMapping("/prices")
    public Iterable<Price> findAllPrices() {
        return this.priceRepository.findAll();
    }
    
}
