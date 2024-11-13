package com.backend.customer;

import java.util.List;

public interface CustomerRepositoryCustom {
    List<Customer> findOneTimeCustomers();
    List<Customer> findCustomersWithMoreThan10PurchasesLastMonth();
    List<Customer> findOccasionalCustomers();
}
