package com.backend.order;

import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/api/customer/{id}")
    public Order getOrderById(@PathVariable String id) throws Exception {
        return orderService.findById(id);
    }

    @PostMapping("/api/customer")
    public Order createOrder(@RequestBody Order order) throws Exception {
        return orderService.createOneOrder(order);
    }
}
