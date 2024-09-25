package com.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "is442_product")
public class Product {
    @Id
    private String id;
    private String productName;

    public Product() {}
    public Product(
        String id,
        String productName
    ) {
        this.id = id;
        this.productName = productName;
    }

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }

    public String getProductName() { return this.productName; }
    public void setProductName(String productName) { this.productName = productName; }
}
