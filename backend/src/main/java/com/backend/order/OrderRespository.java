package com.backend.order;
import org.springframework.data.repository.CrudRepository;


public interface OrderRespository extends CrudRepository<Order, String> {
    
}


