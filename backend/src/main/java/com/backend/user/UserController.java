package com.backend.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

   @PostMapping("/api/user/delete")
   public User deleteUser(@RequestBody User user) throws Exception {
      return userService.deleteOneUser(user);
   }

   @PostMapping("/api/user/update")
   public User updateUser(@RequestBody User user) throws Exception {
      return userService.updateOneUser(user);
   }

   

}
