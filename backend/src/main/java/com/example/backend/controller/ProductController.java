package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.backend.entity.Product;
import com.example.backend.repository.ProductRepository;

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
