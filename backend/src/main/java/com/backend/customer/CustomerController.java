package com.backend.customer;

import org.springframework.web.bind.annotation.*;

@RestController
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/api/customer/{id}")
    public Customer getCustomerById(@PathVariable String id) throws Exception {
        return customerService.findById(id);
    }

    @PostMapping("/api/customer")
    public Customer createCustomer(@RequestBody Customer customer) throws Exception {
        return customerService.createOneCustomer(customer);
    }
}
