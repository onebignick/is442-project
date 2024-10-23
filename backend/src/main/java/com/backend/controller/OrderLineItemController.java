package com.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.OrderLineItem;
import com.backend.repository.OrderLineItemRepository;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class OrderLineItemController {
    private final OrderLineItemRepository orderLineItemRepository;

    public OrderLineItemController(OrderLineItemRepository orderLineItemRepository) {
        this.orderLineItemRepository = orderLineItemRepository;
    }

    @GetMapping("/orderlineitems")
    public Iterable<OrderLineItem> findAllOrderLineItems() {
        return this.orderLineItemRepository.findAll();
    }
    
}
