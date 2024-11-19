package com.backend.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final EmailSender emailSender;

    @Autowired
    public EmailService(EmailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendEmail(String recipient, String subject, String content) {
        Email emailMessage = new Email(recipient, subject, content);
        emailSender.sendEmail(emailMessage);
    }
}
