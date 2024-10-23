package com.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.backend.entity.Customer;

@Entity
@Table(name = "is442_product")
public class Order {
    @Id
    private String id;
    private String saleDate;
    private String saleType;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    public Order() {}
    public Order(
        String id,
        String saleDate,
        String saleType,
        Customer customer
    ) {
        this.id = id;
        this.saleDate = saleDate;
        this.saleType = saleType;
        this.customer = customer;
    }

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }

    public String getSaleDate() { return this.saleDate; }
    public void setSaleDate(String saleDate) { this.saleDate = saleDate; }

    public String getSaleType() { return this.saleType; }
    public void setSaleType(String saleType) { this.saleType = saleType; }

    public Customer getCustomer() { return this.customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    
}