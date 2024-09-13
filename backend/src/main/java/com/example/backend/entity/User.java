package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity
@Table(name = "is442_user")
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String lastSignInAt;
    private String createdAt;
    private String updatedAt;


    public User() {}
    public User(
        String id,
        String firstName,
        String lastName,
        String username,
        String lastSignInAt,
        String createdAt,
        String updatedAt
    ) {
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.username=username;
        this.lastSignInAt=lastSignInAt;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }

    public String getId() { return this.id; }

    public void setFirstName(String firstName) { this.firstName=firstName; }
    public String getFirstName() { return this.firstName; }

    public void setLastName(String lastName) { this.lastName=lastName; }
    public String getLastName() { return this.lastName; }

    public void setUsername(String username) { this.username = username; }
    public String getUsername() { return this.username; }

    public void setLastSignInAt(String lastSignInAt) { this.lastSignInAt = lastSignInAt; }
    public String getLastSignInAt() { return this.lastSignInAt; }

    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    public String getCreatedAt() { return this.createdAt; }

    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
    public String getUpdatedAt() { return this.updatedAt; }
}