package com.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByClerkUserId(String clerkUserId);
}
