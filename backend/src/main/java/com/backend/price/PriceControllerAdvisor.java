package com.backend.price;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class PriceControllerAdvisor {

    @ExceptionHandler(PriceNotFoundException.class)
    public ResponseEntity<Price> handlePriceNotFoundException(PriceNotFoundException e, WebRequest request) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
