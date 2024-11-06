package com.backend.order;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class OrderControllerAdvisor {

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<Order> handleCustomerNotFoundException(OrderNotFoundException e, WebRequest request) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
}







