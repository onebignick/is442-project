package com.backend.orderLineItem;

import org.apache.catalina.util.CustomObjectInputStream;
import org.springframework.stereotype.Service;

import com.backend.orderLineItem.OrderLineItemNotFoundException;

import java.util.Optional;

@Service
public class OrderLineItemService {
    private OrderLineItemRepository orderLineItemRepository;

    public OrderLineItemService(OrderLineItemRepository orderLineItemRepository) {
        this.orderLineItemRepository = orderLineItemRepository;
    }

    public OrderLineItem findById(String id) throws OrderLineItemNotFoundException {
        Optional<OrderLineItem> oOrderLineItem = orderLineItemRepository.findById(id);
        if (oOrderLineItem.isEmpty())
            throw new OrderLineItemNotFoundException();

        return oOrderLineItem.get();
    }

    public Iterable<OrderLineItem> getAllOrderLineItems() {
        return orderLineItemRepository.findAll();
    }

    public OrderLineItem createOneOrderLineItem(OrderLineItem orderLineItem) throws OrderLineItemAlreadyExistsException {
        try {
            this.findById(orderLineItem.getId());
        } catch (OrderLineItemNotFoundException e) {
            OrderLineItem newOrderLineItem = this.orderLineItemRepository.save(orderLineItem);
            return newOrderLineItem;
        }
        throw new OrderLineItemAlreadyExistsException();
    }

    public String deleteOneOrderLineItem(OrderLineItem orderLineItem) {
        try {
            this.orderLineItemRepository.deleteById(orderLineItem.getId());
            return "Order Line Item deleted";
        } catch (OrderLineItemNotFoundException e) {
            return "Order Line Item not found";
        }
    }

    public OrderLineItem updateOneOrderLineItem(OrderLineItem orderLineItem) throws OrderLineItemNotFoundException {
        try {
            OrderLineItem updatedOrderLineItem = this.findById(orderLineItem.getId());
            updatedOrderLineItem = this.orderLineItemRepository.save(orderLineItem);
            return updatedOrderLineItem;
        } catch (OrderLineItemNotFoundException e) {

            // do nothing
        }
        throw new OrderLineItemNotFoundException();
    }
}
