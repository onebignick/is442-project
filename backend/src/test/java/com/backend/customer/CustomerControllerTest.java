package com.backend.customer;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(CustomerController.class)
public class CustomerControllerTest {

    @MockBean
    CustomerService customerService;

    @Autowired
    MockMvc mockMvc;

    @Test
    public void testGetById() throws Exception {
        Customer customer = new Customer().withId("cus_R9fRSzAzJzawNZ").withName("nicholas ong");
        when(customerService.findById("cus_R9fRSzAzJzawNZ")).thenReturn(customer);
        ResultActions result = mockMvc.perform(get("/api/customer/cus_R9fRSzAzJzawNZ"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("nicholas ong"));

        verify(customerService).findById("cus_R9fRSzAzJzawNZ");
    }
}
