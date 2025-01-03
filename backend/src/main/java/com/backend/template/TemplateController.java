package com.backend.template;

import org.springframework.web.bind.annotation.*;
import java.util.*;

import com.backend.customer.*;
import com.backend.email.*;

@RestController
public class TemplateController {
    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @PostMapping("/api/template")
    public Template createTemplate(@RequestBody Template template) throws Exception {
        return templateService.createOneTemplate(template);
    }

    @GetMapping("/api/template/{id}")
    public Template getTemplateById(@PathVariable String id) throws Exception {
        return templateService.findById(id);
    }

    @GetMapping("/api/template")
    public Iterable<Template> getAllTemplate() throws Exception {
        return templateService.findAllTemplates();
    }

    @PutMapping("/api/template")
    public Template updateTemplate(@RequestBody Template template) throws Exception {
        return templateService.updateOneTemplate(template);
    }

    @DeleteMapping("/api/template")
    public Template deleteTemplate(@RequestBody Template template) throws Exception {
        return templateService.deleteOneTemplate(template);
    }

    @PostMapping("/api/template/sendemail/{id}")
    public String sendEmail(@PathVariable String id) throws Exception {
        //get template based on the id of the template assuming id is email address for testing purpose
        Template template = templateService.findById(id);

        //this is only assuming the column data are meant for the email contents
        String to = template.getId();  
        String subject = template.getName();
        String body = template.getContent();
    
        templateService.sendEmail(to, subject, body);
        return "Email sent successfully!";
    }

    @PostMapping("/api/template/populate")
    public Map<String, Email> populateTemplate(@RequestBody TemplateRequest templateRequest) throws Exception {
        String emailSubject = templateRequest.getEmailSubject();
        Map<String, String> placeholders = templateRequest.getPlaceholders();
        List<Customer> customers = templateRequest.getCustomers();
        
        return templateService.populateTemplate(templateRequest.getId(), emailSubject, placeholders, customers);
    }

    @GetMapping("/api/template/placeholders/{id}")
    public List<String> getPlaceholdersForTemplate(@PathVariable String id) throws Exception {
        return templateService.getPlaceholdersForTemplate(id);
    }
}
