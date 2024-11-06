package com.backend.product;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product findById(String id) {
        Optional<Product> oProduct = productRepository.findById(id);
        if (oProduct.isEmpty()) throw new ProductNotFoundException();

        return oProduct.get();
    }
}
