package com.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.backend.entity.Order;

public interface OrderRepository extends CrudRepository<Order, String>{}