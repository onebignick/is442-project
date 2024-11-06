package com.backend.template;

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
@Table(name="is442_template")

public class Template {
    @Id
    private String id;
    private String name;
    private String content;
}
