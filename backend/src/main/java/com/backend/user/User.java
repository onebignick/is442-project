package com.backend.user;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "is442_user")
public class User {
   @Id
   private String id = UUID.randomUUID().toString();
   private String clerkUserId;
   private String username;
   private String email;
   private String role;
}
