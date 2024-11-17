package com.backend.customer;

import java.util.List;

public interface CustomerRepositoryCustom {
    List<Customer> findOneTimeCustomers();
    List<Customer> findFrequentCustomers();
    List<Customer> findOccasionalCustomers();
    List<Customer> findReturningCustomers();
    List<Object[]> findCustomerLifetimeSpending();
    List<Customer> findActiveCustomers();
}
