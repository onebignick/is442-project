package com.backend.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(String username) throws UserNotFoundException {
        Optional<User> oUser = userRepository.findById(username);
        if (oUser.isEmpty()) throw new UserNotFoundException();

        return oUser.get();
    }
    
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createOneUser(User user) throws UserAlreadyExistsException {
        try {
            this.findById(user.getUsername());
        } catch (UserNotFoundException e) {
            User newUser = this.userRepository.save(user);
            return newUser;
        }
        throw new UserAlreadyExistsException();
    }

    public String deleteOneUser(User user) {
        try {
            this.userRepository.deleteById(user.getUsername());
            return "User deleted";
        } catch (UserNotFoundException e) {
            return "User not found";
            //do nothing
        }

    }

    public User updateOneUser(User user) throws UserNotFoundException {
        try {
            User updatedUser = this.findById(user.getUsername());
            updatedUser = this.userRepository.save(user);
            return updatedUser;
        } catch (UserNotFoundException e) {
            
            //do nothing
        }
        throw new UserNotFoundException();
    }

    public boolean authenticateUser(String email, String password) {
        Optional<User> optionalUser = userRepository.findById(email);
 
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return password.equals(user.getPassword());
        }
 
        return false;
    }

}