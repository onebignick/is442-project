package com.backend.user;

import org.springframework.stereotype.Service;
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

    public User createOneUser(User user) throws UserAlreadyExistsException {
        try {
            this.findById(user.getUsername());
        } catch (UserNotFoundException e) {
            User newUser = this.userRepository.save(user);
            return newUser;
        }
        throw new UserAlreadyExistsException();
    }

    public User deleteOneUser(User user) throws UserNotFoundException {
        try {
            this.userRepository.deleteById(user.getUsername());
        } catch (UserNotFoundException e) {
            //do nothing
        }
        throw new UserNotFoundException();
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
}