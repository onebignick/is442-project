package com.example.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.ClerkWebhookEvent;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

import java.util.Map;
import java.util.Optional;

@RestController
public class ClerkWebhookController {

    private final UserRepository userRepository;

    public ClerkWebhookController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/clerk/webhook")
    public void handleClerkWebhook(@RequestBody ClerkWebhookEvent clerkWebhookEvent) {
        String eventType = clerkWebhookEvent.getType();
        Map<String, Object> data = clerkWebhookEvent.getData();

        switch (eventType) {
            case "user.created": // clerk user creation event
                User newUser = new User(
                    (String)data.get("id"),
                    (String)data.get("first_name"),
                    (String)data.get("last_name"),
                    (String)data.get("username"),
                    data.get("last_sign_in_at").toString(),
                    data.get("created_at").toString(),
                    data.get("updated_at").toString()
                );
                handleUserCreated(newUser);
                break;
            case "user.updated":
                handleUserUpdated((String)data.get("id"));
                break;
        }
    }

    private void handleUserCreated(User clerkUser) {
        this.userRepository.save(clerkUser);
    }

    private void handleUserUpdated(String id) {
        Optional<User> userToUpdate = this.userRepository.findById(id);
        this.userRepository.save(userToUpdate.get());
    }
}