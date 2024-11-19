package com.backend.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage; 
import org.springframework.stereotype.Component;

@Component
public class EmailSender {
    private final JavaMailSender mailSender;

    @Autowired
    public EmailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(Email emailMessage) throws EmailException {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(emailMessage.getRecipient());
            helper.setSubject(emailMessage.getSubject());
            helper.setText(emailMessage.getContent(), true); // true means the content is HTML
            mailSender.send(mimeMessage);
            System.out.println("Email sent to: " + emailMessage.getRecipient());
        } catch (MessagingException e) {
            System.out.println("Error while sending email: " + e.getMessage());
            throw new EmailException("Error sending email");
        } catch (EmailException e) {
            System.out.println("Error while sending email: " + e.getMessage());
            throw new EmailException("Error sending email");
        }
    }
}
