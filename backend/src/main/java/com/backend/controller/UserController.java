package com.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.User;
import com.backend.repository.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public Iterable<User> findAllUsers() {
        return this.userRepository.findAll();
    }

    public User addOneUser(User user) {
        return this.userRepository.save(user);
    }
}
