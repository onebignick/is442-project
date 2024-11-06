package com.backend.orderLineItem;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface OrderLineItemRepository extends CrudRepository<OrderLineItem, String> {
    List<OrderLineItem> findByOrderId(String orderId);
}