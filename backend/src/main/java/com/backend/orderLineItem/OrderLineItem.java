package com.backend.orderLineItem;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.*;
import java.util.UUID;
import com.backend.order.Order;
import com.backend.price.Price;


@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="is442_order_line_item")
public class OrderLineItem {
    @Id
    private String id = UUID.randomUUID().toString();
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "price_id", referencedColumnName = "id")  // This links the PriceId column to Price table
    private Price price;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")  // This links the PriceId column to Price table
    private Order order;
}