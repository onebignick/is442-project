package com.backend.template;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TemplateService {
    private TemplateRepository templateRepository;

    public TemplateService(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public Template findById(String id) throws TemplateNotFoundException {
        Optional<Template> oTemplate = templateRepository.findById(id);
        if (oTemplate.isEmpty()) throw new TemplateNotFoundException();

        return oTemplate.get();
    }

    public Iterable<Template> findAllTemplates() {
        return templateRepository.findAll();
    }

    public Template createOneTemplate(Template template) throws TemplateAlreadyExistsException {
        try {
            this.findById(template.getId());
        } catch (TemplateNotFoundException e) {
            Template newTemplate = this.templateRepository.save(template);
            return newTemplate;
        }
        throw new TemplateAlreadyExistsException();
    }

    public Template updateOneTemplate(Template template) throws TemplateNotFoundException {
            Template updatedTemplate = this.findById(template.getId());
            updatedTemplate = this.templateRepository.save(template);
            return updatedTemplate;
    }

    public Template deleteOneTemplate(Template template) throws TemplateNotFoundException {
        Optional<Template> oTemplate = templateRepository.findById(template.getId());
        if (oTemplate.isEmpty()) {
            throw new TemplateNotFoundException();
        }
        templateRepository.deleteById(template.getId());
        return oTemplate.get();
    }
}
