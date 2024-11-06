package com.backend.customer;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer findById(String id) throws CustomerNotFoundException {
        Optional<Customer> oCustomer = customerRepository.findById(id);
        if (oCustomer.isEmpty()) throw new CustomerNotFoundException();

        return oCustomer.get();
    }

    public void createOneCustomer(Customer customer) throws CustomerAlreadyExistsException {
        try {
            this.findById(customer.getId());
        } catch (CustomerNotFoundException e) {
            Customer newCustomer = this.customerRepository.save(customer);
            return;
        }
        throw new CustomerAlreadyExistsException();
    }
}
