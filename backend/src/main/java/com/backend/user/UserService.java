package com.backend.user;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(String id) throws UserNotFoundException {
        Optional<User> oUser = userRepository.findById(id);
        if (oUser.isEmpty()) throw new UserNotFoundException();

        return oUser.get();
    }

    public List<User> findByClerkUserId(String clerkUserId) throws UserNotFoundException {
        List<User> oUser = userRepository.findByClerkUserId(clerkUserId);
        if (oUser.isEmpty()) throw new UserNotFoundException();

        return oUser;
    }
    
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createOneUser(User user) throws UserAlreadyExistsException {
        try {
            this.findById(user.getId());
        } catch (UserNotFoundException e) {
            User newUser = this.userRepository.save(user);
            return newUser;
        }
        throw new UserAlreadyExistsException();
    }

    public String deleteOneUser(User user) {
        try {
            this.userRepository.deleteById(user.getId());
            return "User deleted";
        } catch (UserNotFoundException e) {
            return "User not found";
            //do nothing
        }

    }

    public User updateOneUser(User user) throws UserNotFoundException {
        try {
            User updatedUser = this.findById(user.getId());
            updatedUser = this.userRepository.save(user);
            return updatedUser;
        } catch (UserNotFoundException e) {
            
            //do nothing
        }
        throw new UserNotFoundException();
    }

    // public boolean authenticateUser(String email, String password) {
    //     Optional<User> optionalUser = userRepository.findById(email);
 
    //     if (optionalUser.isPresent()) {
    //         User user = optionalUser.get();
    //         return password.equals(user.getPassword());
    //     }
 
    //     return false;
    // }

}