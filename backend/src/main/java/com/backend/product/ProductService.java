package com.backend.product;

import org.springframework.stereotype.Service;

import com.backend.user.UserNotFoundException;

import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product findById(String id) {
        Optional<Product> oProduct = productRepository.findById(id);
        if (oProduct.isEmpty())
            throw new ProductNotFoundException();

        return oProduct.get();
    }

    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createOneProduct(Product product) throws ProductNotFoundException {
        try {
            this.findById(product.getId());
        } catch (ProductNotFoundException e) {
            Product newProduct = this.productRepository.save(product);
            return newProduct;
        }
        throw new ProductNotFoundException();
    }

    public String deleteOneProduct(Product product) {
        try {
            this.productRepository.deleteById(product.getId());
            return "Product deleted";
        } catch (ProductNotFoundException e) {
            return "Product not found";
        }
    }

    public Product updateOneProduct(Product product) throws ProductNotFoundException {
        try {
            Product updateProduct = this.findById(product.getId());
            updateProduct = this.productRepository.save(product);
            return updateProduct;
        } catch (UserNotFoundException e) {

            // do nothing
        }
        throw new ProductNotFoundException();
    }
}