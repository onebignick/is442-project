package com.backend.order;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, String> {
    // Additional query methods can be defined here if needed
    Optional<Order> findBySalesType(String salesType);
    Optional<Order> findByCustomerId(String customer_id);
}
