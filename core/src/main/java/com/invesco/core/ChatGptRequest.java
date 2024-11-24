package com.invesco.core;

import lombok.Data;
import java.util.ArrayList;
import java.util.List;

import static org.apache.commons.lang3.StringUtils.isNotEmpty;

@Data
public class ChatGptRequest {
    private final int max_tokens;
    private final String model;
    private List<Message> messages;

    public ChatGptRequest(String tone, String prompt, String model, String role) {
        this.max_tokens = 1500;
        this.model = model;
        this.messages = new ArrayList<>();

        if (isNotEmpty(tone)) {
            Message toneMessage = new Message();
            toneMessage.setRole(role);
            toneMessage.setContent(tone);
            this.messages.add(toneMessage);
        }

        Message promptMessage = new Message();
        promptMessage.setRole(role);
        promptMessage.setContent(prompt);
        this.messages.add(promptMessage);
    }

}