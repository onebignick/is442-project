package com.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Order;
import com.backend.repository.OrderRepository;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class OrderController {
    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/orders")
    public Iterable<Order> findAllOrders() {
        return this.orderRepository.findAll();
    }
    
}
