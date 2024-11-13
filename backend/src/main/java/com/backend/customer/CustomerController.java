package com.backend.customer;

import java.util.List;

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

    @GetMapping("/api/customer/onetime")
    public List<Customer> findOneTimeCustomers() {
        return customerService.findOneTimeCustomers();
    }

    @GetMapping("/api/customer")
    public Iterable<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PostMapping("/api/customer")
    public Customer createCustomer(@RequestBody Customer customer) throws Exception {
        return customerService.createOneCustomer(customer);
    }

    @DeleteMapping("/api/customer")
    public String deleteCustomer(@RequestBody Customer customer) throws Exception {
        return customerService.deleteOneCustomer(customer);
    }

    @PutMapping("/api/customer")
    public Customer updateCustomer(@RequestBody Customer customer) throws Exception {
        return customerService.updateOneCustomer(customer);
    }

    @GetMapping("/api/customer/frequent")
    public Iterable<Customer> findFrequentCustomers() {
        return customerService.findFrequentCustomers();
    }

    @GetMapping("/api/customer/occasional")
    public List<Customer> findOccasionalCustomers() {
        return customerService.findOccasionalCustomers();
    }

    @GetMapping("/api/customer/highvalue")
    public List<Object[]> getHighValueCustomers() {
        return customerService.getHighValueCustomers();
    }

    @GetMapping("/api/customer/midtier")
    public List<Object[]> getMidTierCustomers() {
        return customerService.getMidTierCustomers();
    }

    @GetMapping("/api/customer/lowspend")
    public List<Object[]> getLowSpendCustomers() {
        return customerService.getLowSpendCustomers();
    }
}
