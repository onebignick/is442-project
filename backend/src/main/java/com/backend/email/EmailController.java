package com.backend.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/api/email/send")
    public String sendEmails(@RequestBody Map<String, Email> emailData) {
        for (Map.Entry<String, Email> entry : emailData.entrySet()) {
            // String userId = entry.getKey();
            Email emailContent = entry.getValue();
            emailService.sendEmail(emailContent.getRecipient(), emailContent.getSubject(), emailContent.getContent());
        }
        return "Emails sent successfully!";
    }
}
