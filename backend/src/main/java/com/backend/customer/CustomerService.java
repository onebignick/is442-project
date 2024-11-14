package com.backend.customer;

import org.springframework.stereotype.Service;

import com.backend.user.UserNotFoundException;

import java.util.List;
import java.util.Optional;

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

    public List<Customer> findOccasionalCustomers() {
        List<Customer> occasionalCustomers = customerRepository.findOccasionalCustomers();
        return occasionalCustomers;
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

    public List<Customer> findFrequentCustomers() {
        List<Customer> customers = customerRepository.findFrequentCustomers();
        return customers;
    }

    public List<Object[]> getHighValueCustomers() {
        List<Object[]> customerLifetimeSpendingList = customerRepository.findCustomerLifetimeSpending();
        customerLifetimeSpendingList.sort((a, b) -> ((Double) a[3]).compareTo((Double) b[3])); // compare based on 3rd element - lifetimespending

        int totalCustomers = customerLifetimeSpendingList.size();
        int highTierStart = (int) (totalCustomers * 0.9);
        return customerLifetimeSpendingList.subList(highTierStart, totalCustomers);
    }

    public List<Object[]> getMidTierCustomers() {
        List<Object[]> customerLifetimeSpendingList = customerRepository.findCustomerLifetimeSpending();
        customerLifetimeSpendingList.sort((a, b) -> ((Double) a[3]).compareTo((Double) b[3]));

        int totalCustomers = customerLifetimeSpendingList.size();
        int midTierStart = (int) (totalCustomers * 0.2);
        int midTierEnd = (int) (totalCustomers * 0.9);
        return customerLifetimeSpendingList.subList(midTierStart, midTierEnd);
    }

    public List<Object[]> getLowSpendCustomers() {
        List<Object[]> customerLifetimeSpendingList = customerRepository.findCustomerLifetimeSpending();
        customerLifetimeSpendingList.sort((a, b) -> ((Double) a[3]).compareTo((Double) b[3]));

        int totalCustomers = customerLifetimeSpendingList.size();
        int lowTierEnd = (int) (totalCustomers * 0.2);
        return customerLifetimeSpendingList.subList(0, lowTierEnd);
    }
}
