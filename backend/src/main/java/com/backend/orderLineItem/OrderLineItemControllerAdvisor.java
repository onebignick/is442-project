package com.backend.orderLineItem;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class OrderLineItemControllerAdvisor {

    @ExceptionHandler(OrderLineItemNotFoundException.class)
    public ResponseEntity<OrderLineItem> handleOrderLineItemNotFoundException(OrderLineItemNotFoundException e, WebRequest request) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
