package com.backend.order;

import org.springframework.stereotype.Service;
import com.backend.order.OrderRepository;
import com.backend.user.UserNotFoundException;

import java.util.Optional;

@Service
public class OrderService {
    private OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order findById(String id) throws OrderNotFoundException {
        Optional<Order> oOrder = orderRepository.findById(id);
        if (oOrder.isEmpty()) throw new OrderNotFoundException();

        return oOrder.get();
    }

    public Iterable<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order createOneOrder(Order order) throws OrderAlreadyExistsException {
        try {
            this.findById(order.getId());
        } catch (OrderNotFoundException e) {
            Order newOrder = this.orderRepository.save(order);
            return newOrder;
        }
        throw new OrderAlreadyExistsException();
    }

    public Order updateOneOrder(Order order) throws OrderNotFoundException {
        try {
            // Find the existing order
            Order updatedOrder = this.findById(order.getId());
            
            // Now update the fields that have changed
            updatedOrder.setAddress(order.getAddress());
            updatedOrder.setSalesDate(order.getSalesDate());
            updatedOrder.setSalesType(order.getSalesType());  // Use correct field name
            updatedOrder.setShippingMethod(order.getShippingMethod());
            // Add other fields that you want to update
            
            // Save the updated order
            return this.orderRepository.save(updatedOrder);
        } catch (OrderNotFoundException e) {
            // Handle case when order is not found
            throw new OrderNotFoundException();
        }
    }

    public String deleteOneOrder(Order order) {
        try {
            this.orderRepository.deleteById(order.getId());
            return "Order deleted";
        } catch (OrderNotFoundException e) {
            return "Order not found";
            //do nothing
        }

    }
    
}



