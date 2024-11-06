package com.backend.order;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import com.backend.customer.Customer;
import java.util.UUID;


@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="is442_order")

public class Order {
    
    @Id
    private String id = UUID.randomUUID().toString();
    // Many orders can be associated with one customer
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false) // Corrected column name
    private Customer customer;

    private String salesDate;
    private String salesType;
    private String shippingMethod;
    private String address;



}


