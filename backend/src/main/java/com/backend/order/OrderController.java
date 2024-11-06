package com.backend.order;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/api/order/{id}")
    public Order getOrderById(@PathVariable String id) throws Exception {
        return orderService.findById(id);
    }

    @GetMapping("/api/orders")
    public Iterable<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/api/orders/price")
    public List<Map<String, Object>> getAllOrdersWithTotalPrice() {
        return orderService.getAllOrdersWithTotalPrice();
    }

    @PutMapping("/api/order")
    public Order updateOrder(@RequestBody Order order) throws Exception {
       return orderService.updateOneOrder(order);
    }

    @PostMapping("/api/order")
    public Order createOrder(@RequestBody Order order) throws Exception {
       return orderService.createOneOrder(order);
    }

    @DeleteMapping("/api/order")
    public String deleteOrder(@RequestBody Order order) throws Exception {
       return orderService.deleteOneOrder(order);
    }
 


 
}
