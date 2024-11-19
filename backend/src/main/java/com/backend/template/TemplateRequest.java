package com.backend.template;

import lombok.*;
import java.util.*;

import com.backend.customer.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TemplateRequest {
    private String id;  // template ID
    private Map<String, String> placeholders;  // placeholders to replace in the template
    private List<Customer> customers;  // list of customer objects
}

