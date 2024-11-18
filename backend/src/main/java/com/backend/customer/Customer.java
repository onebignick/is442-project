package com.backend.customer;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.*;
import java.util.UUID;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="is442_customer")
public class Customer {
    @Id
    private String id = UUID.randomUUID().toString();
    private String name;
    private String email;

    @Transient
    private Double lifetimeSpending;

}