package com.example.backend.entity.stripe;

import java.util.Map;

import jakarta.persistence.Id;

public class Event {
    @Id
    private String id;
    private Map<String, Object> data;
    private String type;

    public Event() {}
    public Event(String id, Map<String, Object> data, String type) {
        this.id = id;
        this.data = data;
        this.type = type;
    }

    public String getId() { return this.id; }
    public Map<String, Object> getData() { return this.data; }
    public String getType() { return this.type; }
}
