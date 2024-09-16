package com.example.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.backend.entity.Customer;

public interface CustomerRepository extends CrudRepository<Customer, String>{}