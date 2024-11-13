package com.backend.customer;

import org.apache.catalina.util.CustomObjectInputStream;
import org.springframework.stereotype.Service;

import com.backend.user.UserNotFoundException;

import java.lang.foreign.Linker.Option;
import java.util.List;
import java.util.Optional;
import java.util.List;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer findById(String id) throws CustomerNotFoundException {
        Optional<Customer> oCustomer = customerRepository.findById(id);
        if (oCustomer.isEmpty())
            throw new CustomerNotFoundException();

        return oCustomer.get();
    }

    public List<Customer> findOneTimeCustomers() {
        List<Customer> oneTimeCustomers = customerRepository.findOneTimeCustomers();
        return oneTimeCustomers;
    }

    public Iterable<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer createOneCustomer(Customer customer) throws CustomerAlreadyExistsException {
        try {
            this.findById(customer.getId());
        } catch (CustomerNotFoundException e) {
            Customer newCustomer = this.customerRepository.save(customer);
            return newCustomer;
        }
        throw new CustomerAlreadyExistsException();
    }

    public String deleteOneCustomer(Customer customer) {
        try {
            this.customerRepository.deleteById(customer.getId());
            return "Customer deleted";
        } catch (CustomerNotFoundException e) {
            return "Customer not found";
        }
    }

    public Customer updateOneCustomer(Customer customer) throws UserNotFoundException {
        try {
            Customer updatedCustomer = this.findById(customer.getId());
            updatedCustomer = this.customerRepository.save(customer);
            return updatedCustomer;
        } catch (UserNotFoundException e) {

            // do nothing
        }
        throw new UserNotFoundException();
    }

    public List<Customer> findActiveCustomersLastMonth() {
        List<Customer> customers = customerRepository.findCustomersWithMoreThan10PurchasesLastMonth();
        return customers;
    }
}
