package com.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Product;
import com.backend.repository.ProductRepository;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/products")
    public Iterable<Product> findAllProducts() {
        return this.productRepository.findAll();
    }
    
}
