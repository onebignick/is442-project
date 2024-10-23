package com.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.backend.entity.Product;

@Entity
@Table(name = "is442_product")
public class Price {
    @Id
    private String id;
    private double price;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    public Price() {}
    public Price(
        String id,
        double price,
        Product product
    ) {
        this.id = id;
        this.price = price;
        this.product = product;
    }

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }

    public double getPrice() { return this.price; }
    public void setPrice(double price) { this.price = price; }

    public Product getProduct() { return this.product; }
    public void setProduct(Product product) { this.product = product; }

}
