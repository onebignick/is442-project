package com.backend.template;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import java.util.UUID;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="is442_template")

public class Template {
    @Id
    private String id = UUID.randomUUID().toString();
    private String name;
    private String content;
}
