package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "is442_customer")
public class Customer {
    @Id
    private String id;
    
    public Customer() {}
    public Customer(
        String id
    ) {
        this.id = id;
    }

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }
}
