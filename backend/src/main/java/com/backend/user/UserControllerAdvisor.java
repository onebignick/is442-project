package com.backend.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class UserControllerAdvisor {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<User> handleUserNotFoundException(UserNotFoundException e, WebRequest request) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}