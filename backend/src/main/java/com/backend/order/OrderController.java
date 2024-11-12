package com.backend.order;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/api/order/salestype/{salesType}")
    public Order getSalesType(@PathVariable String salesType) throws Exception {
        return orderService.findBySalesType(salesType);
    }
 


 
}
