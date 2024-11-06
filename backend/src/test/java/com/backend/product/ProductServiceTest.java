package com.backend.product;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    ProductRepository productRepository;

    @Test
    public void shouldGetCustomerById() throws Exception {
        ProductService productService = new ProductService(productRepository);
        Optional<Product> product = Optional.of(new Product().withId("1").withName("test"));
        when(productRepository.findById("1")).thenReturn(product);
        Product foundProduct = productService.findById("1");
        assertThat(foundProduct).isEqualTo(product.get());
        verify(productRepository).findById("1");
    }

    @Test
    public void shouldThrowWhenGetByIdNotFound() throws Exception {

        ProductService productService = new ProductService(productRepository);
        Optional<Product> product = Optional.empty();
        when(productRepository.findById("2")).thenReturn(product);
        assertThrows(ProductNotFoundException.class, () -> {
            Product foundProduct = productService.findById("2");
        });
        verify(productRepository).findById("2");
    }
}
