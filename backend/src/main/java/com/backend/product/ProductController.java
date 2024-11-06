package com.backend.product;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/api/product/{id}")
    public Product getProductById(@PathVariable String id) throws Exception {
        return productService.findById(id);
    }

    
    @GetMapping("/api/product")
    public Iterable<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/api/product")
    public Product createProduct(@RequestBody Product product) throws Exception {
        return productService.createOneProduct(product);
    }

    @DeleteMapping("/api/product")
    public String deleteProduct(@RequestBody Product product) throws Exception {
        return productService.deleteOneProduct(product);
    }

    @PutMapping("/api/product")
    public Product updateProduct(@RequestBody Product product) throws Exception {
        return productService.updateOneProduct(product);
    }

}
