package com.invesco.core;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Component(service = OpenAiService.class, immediate = true)
@Designate(ocd = OpenAiService.Config.class)
public class OpenAiService {

    static final String COMPLETIONS_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    static final String MODEL = "gpt-4o-mini";
    static final ObjectMapper jackson = new ObjectMapper();

    Config config;

    @Activate
    protected void activate(Config config) {
        this.config = config;
    }

    ChatGptResponse completion(String prompt) {
        ChatGptRequest gptRequest = new ChatGptRequest(prompt, MODEL, "user");

        ChatGptResponse gptResponse;
        try {
            String body = jackson.writeValueAsString(gptRequest);

            URI uri = new URI(COMPLETIONS_ENDPOINT);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .setHeader("Content-Type", "application/json")
                    .setHeader("Authorization", "Bearer " + config.apiKey())
                    .setHeader("OpenAI-Organization", config.organization())
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .timeout(Duration.ofSeconds(config.timeout()))
                    .build();

            HttpClient client = HttpClient.newBuilder().build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            gptResponse = jackson.readValue(response.body(), ChatGptResponse.class);

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return gptResponse;
    }

    @ObjectClassDefinition(name = "OpenAI Service Configuration")
    public @interface Config {
        @AttributeDefinition(name = "API KEY")
        String apiKey();

        @AttributeDefinition(name = "Organization")
        String organization();

        @AttributeDefinition(name = "Timeout (milliseconds)")
        int timeout() default 10;
    }
}
