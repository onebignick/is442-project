package com.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.backend.entity.Order;
import com.backend.entity.Price;

@Entity
@Table(name = "is442_product")
public class OrderLineItem {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "price_id", referencedColumnName = "id")
    private Price price;

    private int orderQuantity;

    public OrderLineItem() {}
    public OrderLineItem(
        String id,
        Order order,
        Price price,
        int orderQuantity
    ) {
        this.id = id;
        this.order = order;
        this.price = price;
        this.orderQuantity = orderQuantity;
    }

    public String getId() { return this.id; }
    public void setId(String id) { this.id = id; }

    public Order getOrder() { return this.order; }
    public void setOrder(Order order) { this.order = order; }

    public Price getPrice() { return this.price; }
    public void setPrice(Price price) { this.price = price; }

    public int getOrderQuantity() { return this.orderQuantity; }
    public void setOrderQuantity(int orderQuantity) { this.orderQuantity = orderQuantity; }

}