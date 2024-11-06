package com.backend.customer;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class CustomerEndToEndTest {

    @Autowired CustomerRepository customerRepository;

    @Autowired
    TestRestTemplate testRestTemplate;

    @BeforeEach
    public void setUp() {
        customerRepository.deleteAll();
    }

    @Test
    public void testGetById() throws Exception {
        Customer customer = new Customer().withId("cus_R9fRSzAzJzawNZ").withName("nicholas ong");
        customerRepository.save(customer);

        ResponseEntity<Customer> foundCustomer = testRestTemplate.getForEntity("/api/customer/cus_R9fRSzAzJzawNZ", Customer.class);

        assertEquals(foundCustomer.getStatusCode(), HttpStatus.OK);

        assertNotNull(foundCustomer);
        assertEquals("nicholas ong", foundCustomer.getBody().getName());
    }

    @Test
    public void testGetByIdNotFound() throws Exception {
        ResponseEntity<Customer> foundCustomer = testRestTemplate.getForEntity("/api/customer/1", Customer.class);
        assertEquals(foundCustomer.getStatusCode(), HttpStatus.NOT_FOUND);
    }
}
