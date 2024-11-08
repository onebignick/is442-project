package com.backend.order;

import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, String> {
    // Additional query methods can be defined here if needed
}