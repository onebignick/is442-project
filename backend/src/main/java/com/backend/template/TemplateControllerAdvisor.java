package com.backend.template;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class TemplateControllerAdvisor {
    @ExceptionHandler(TemplateNotFoundException.class)
    public ResponseEntity<Template> handleTemplateNotFoundException(TemplateNotFoundException e, WebRequest request) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
