package com.backend.user;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
   private final UserService userService;

   public UserController(UserService userService) {
        this.userService = userService;
    }

   @GetMapping("/api/user/{username}")
   public User getUserById(@PathVariable String username) throws Exception {
      return userService.findById(username);
   }

   @GetMapping("/api/users")
   public Iterable<User> getAllUsers() {
       return userService.getAllUsers();
   }

   @PostMapping("/api/user")
   public User createUser(@RequestBody User user) throws Exception {
      return userService.createOneUser(user);
   }

   @DeleteMapping("/api/user")
   public String deleteUser(@RequestBody User user) throws Exception {
      return userService.deleteOneUser(user);
   }

   @PutMapping("/api/user")
   public User updateUser(@RequestBody User user) throws Exception {
      return userService.updateOneUser(user);
   }

   @PostMapping("/api/user/login")
   public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {
      String email = loginData.get("email");
      String password = loginData.get("password");
      boolean isAuthenticated = userService.authenticateUser(email, password);
      return isAuthenticated ? ResponseEntity.ok("Login successful") : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
   }

}
