package com.backend.customer;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.order.OrderService;
import com.backend.user.UserNotFoundException;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;
    private OrderService orderService;


    public CustomerService(CustomerRepository customerRepository, OrderService orderService) {
        this.customerRepository = customerRepository;
        this.orderService = orderService;
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



    public List<Customer> getDormantCustomers() {
        // Define the date range: six months ago to today
        LocalDate currentDate = LocalDate.now();
        LocalDate sixMonthsAgo = currentDate.minusMonths(6);
        
        // Format the dates as strings in "yyyy-MM-dd" format
        String startDate = sixMonthsAgo.format(DateTimeFormatter.ISO_DATE);
        String endDate = currentDate.format(DateTimeFormatter.ISO_DATE);
        
        // Get all orders within the last 6 months using OrderService
        List<Map<String, Object>> recentOrders = orderService.getOrdersByDateRange(startDate, endDate);
        
        // Extract unique customer IDs from recent orders
        List<String> activeCustomerIds = recentOrders.stream()
                .map(order -> (String) order.get("customer_id"))
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
        
        // Retrieve all customers and exclude those with active customer IDs
        List<Customer> dormantCustomers = customerRepository.findAll().stream()
                .filter(customer -> !activeCustomerIds.contains(customer.getId()))
                .collect(Collectors.toList());
        
        return dormantCustomers;
    }

    public List<Customer> findReturningCustomers() {
        List<Customer> customers = customerRepository.findReturningCustomers();
        return customers;
    }

}
