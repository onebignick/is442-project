package com.backend.customer;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.backend.order.OrderService;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CustomerServiceTest {

    @Mock
    CustomerRepository customerRepository;
    OrderService orderService;

    @Test
    public void getCustomerById() throws Exception {
        CustomerService customerService = new CustomerService(customerRepository, orderService);
        Optional<Customer> customer = Optional.of(new Customer().withId("cus_R9fRSzAzJzawNZ").withName("nicholas ong"));
        when(customerRepository.findById("cus_R9fRSzAzJzawNZ")).thenReturn(customer);
        Customer foundCustomer = customerService.findById("cus_R9fRSzAzJzawNZ");
        assertThat(foundCustomer).isEqualTo(customer.get());
        verify(customerRepository).findById("cus_R9fRSzAzJzawNZ");
    }

    @Test
    public void testGetByIdNotFound() {

        CustomerService customerService = new CustomerService(customerRepository, orderService);
        Optional<Customer> customer = Optional.empty();
        when(customerRepository.findById("unknown")).thenReturn(customer);

        assertThrows(CustomerNotFoundException.class, () -> {
            Customer foundCustomer = customerService.findById("unknown");
        });
        verify(customerRepository).findById("unknown");
    }
}
