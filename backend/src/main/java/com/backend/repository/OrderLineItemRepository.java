package com.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.backend.entity.OrderLineItem;

public interface OrderLineItemRepository extends CrudRepository<OrderLineItem, String>{}