package com.invesco.core;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true )
public class ChatGptResponse {
    private List<Choice> choices;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true )
    public static class Choice {
        private Message message;            
    }
}

