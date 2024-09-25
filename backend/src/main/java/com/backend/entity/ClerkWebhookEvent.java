package com.backend.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.Map;

public class ClerkWebhookEvent {
    @Id
    @GeneratedValue
    private String id;
    private Map<String, Object> data;
    private String object;
    private String type;

    public ClerkWebhookEvent() {}
    public ClerkWebhookEvent(Map<String, Object> data, String object, String type) {
        this.data = data;
        this.object = object;
        this.type = type;
    }

    public Map<String, Object> getData() { return this.data; }
    public String getObject() { return this.object; }
    public String getType() { return this.type; }
}
