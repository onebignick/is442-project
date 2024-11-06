package com.backend.order;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import com.backend.customer.Customer;



@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="is442_order")

public class Order {
    
    @Id
    private String id;
    // Many orders can be associated with one customer
    @ManyToOne
    @JoinColumn(name = "custID", referencedColumnName = "id", nullable = false) // Foreign key column
    private Customer customer;

    private Date salesDate;
    private String salesType;
    private String shippingMethod;
    private String address;


}

