package com.backend.customer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, String>, CustomerRepositoryCustom {
    List<Customer> findByEmail(String email);
}