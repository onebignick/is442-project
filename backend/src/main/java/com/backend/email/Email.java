package com.backend.email;

import lombok.*;

@Getter
@Setter
@With
@NoArgsConstructor
@AllArgsConstructor

public class Email {
    private String recipient;
    private String subject;
    private String content;
}
