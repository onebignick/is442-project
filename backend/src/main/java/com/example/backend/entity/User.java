package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity
@Table(name = "is442_user")
public class User {
    @Id
    @GeneratedValue
    private String id;
    
    private String clerkUserId;

    public User(String clerkUserId) {
        this.clerkUserId = clerkUserId;
    }

    public String getId() { return this.id; }
    public String getClerkUserId() { return this.clerkUserId; }
}