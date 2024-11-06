package com.backend.orderLineItem;

import org.apache.catalina.util.CustomObjectInputStream;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderLineItemController {
    private final OrderLineItemService orderLineItemService;

    public OrderLineItemController(OrderLineItemService orderLineItemService) {
        this.orderLineItemService = orderLineItemService;
    }

    @GetMapping("/api/orderLineItem/{id}")
    public OrderLineItem getOrderLineItemById(@PathVariable String id) throws Exception {
        return orderLineItemService.findById(id);
    }

    @GetMapping("/api/orderLineItem")
    public Iterable<OrderLineItem> getAllOrderLineItems() {
        return orderLineItemService.getAllOrderLineItems();
    }

    @PostMapping("/api/orderLineItem")
    public OrderLineItem createOrderLineItem(@RequestBody OrderLineItem orderLineItem) throws Exception {
        return orderLineItemService.createOneOrderLineItem(orderLineItem);
    }

    @DeleteMapping("/api/orderLineItem")
    public String deleteOrderLineItem(@RequestBody OrderLineItem orderLineItem) throws Exception {
        return orderLineItemService.deleteOneOrderLineItem(orderLineItem);
    }

    @PutMapping("/api/orderLineItem")
    public OrderLineItem updateOrderLineItem(@RequestBody OrderLineItem orderLineItem) throws Exception {
        return orderLineItemService.updateOneOrderLineItem(orderLineItem);
    }

}
