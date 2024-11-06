package com.backend.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import java.util.*;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "is442_user")
public class User {
   @Id
   private String username;
   private String password;
   private ArrayList<String> role = new ArrayList<>();
}
