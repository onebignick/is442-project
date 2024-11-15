package com.backend.template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TemplateService {
    private TemplateRepository templateRepository;

    @Autowired
    private JavaMailSender mailSender;

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

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("is442oopproject@gmail.com");
        mailSender.send(message);
    }
}
