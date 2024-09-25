package com.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.backend.entity.Customer;

public interface CustomerRepository extends CrudRepository<Customer, String>{}