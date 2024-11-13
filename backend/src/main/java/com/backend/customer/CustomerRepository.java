package com.backend.customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, String>, CustomerRepositoryCustom {
}