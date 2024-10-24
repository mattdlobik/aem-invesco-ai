package com.invesco.core;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import static org.apache.sling.api.request.header.MediaRangeList.HEADER_ACCEPT;
import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;

@Component(service = FundDataService.class, immediate = true)
@Designate(ocd = FundDataService.Config.class)
public class FundDataService {

    private static final ObjectMapper jackson = new ObjectMapper();

    Config config;

    @Activate
    protected void activate(Config config) {
        this.config = config;
    }

    public JsonNode fundData(String fund) {
        JsonNode result;

        ObjectNode rootNode = jackson.createObjectNode();
        rootNode.put("ticker", fund);
        rootNode.put("noAfterTaxReturns", true);
        rootNode.put("period", "MONTHLY");

        try {
            URI uri = new URI(config.endpoint());

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .setHeader(HEADER_ACCEPT, "application/json")
                    .setHeader("Content-Type", "application/json")
                    .method(METHOD_GET, HttpRequest.BodyPublishers.ofString(rootNode.toString()))
                    .timeout(Duration.ofSeconds(config.timeout()))
                    .build();

            HttpClient client = HttpClient.newBuilder().build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            result = jackson.readTree(response.body());

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return result;
    }

    @ObjectClassDefinition(name = "Fund Data Service Configuration")
    public static @interface Config {
        String endpoint();
        int timeout() default 10;
    }
}
