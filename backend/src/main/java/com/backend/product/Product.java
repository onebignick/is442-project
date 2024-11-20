package com.backend.product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import java.util.UUID;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="is442_product")
public class Product {
    @Id
    private String id = UUID.randomUUID().toString();
    private String stripeProductId;
    private String name;
}