package com.backend.product;

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
public class ProductEndToEndTest {

    @Autowired ProductRepository productRepository;
    @Autowired
    TestRestTemplate testRestTemplate;

    @BeforeEach
    public void setUp() {
        productRepository.deleteAll();
    }

    @Test
    public void shouldGetById() throws Exception {
        Product product = new Product().withId("1").withName("test");
        productRepository.save(product);

        ResponseEntity<Product> foundProduct = testRestTemplate.getForEntity("/api/product/1", Product.class);
        assertEquals(foundProduct.getStatusCode(), HttpStatus.OK);
        assertNotNull(foundProduct);
        assertEquals(foundProduct.getBody().getName(), "test");
    }

    @Test
    public void shouldGetByIdNotFound() throws Exception {
        ResponseEntity<Product> foundProduct = testRestTemplate.getForEntity("/api/product/2", Product.class);
        assertEquals(foundProduct.getStatusCode(), HttpStatus.NOT_FOUND);
    }

}
