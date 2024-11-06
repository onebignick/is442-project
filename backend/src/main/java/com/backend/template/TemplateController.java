package com.backend.template;

import org.springframework.web.bind.annotation.*;

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
}
