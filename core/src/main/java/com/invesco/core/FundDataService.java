package com.invesco.core;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

@Component(service = FundDataService.class, immediate = true)
@Designate(ocd = FundDataConfig.class)
public class FundDataService {

    FundDataConfig config;

//    private static final MustacheFactory mf = new DefaultMustacheFactory();
    private static final ObjectMapper jackson = new ObjectMapper();

    @Activate
    protected void activate(FundDataConfig config) {
        this.config = config;
    }

    public JsonNode fundData(String fund) {
        String endpoint = config.endpoint();
//        Map<String, Object> tokens = Map.of("fund", fund);

//        Mustache mustache = mf.compile(new StringReader(endpoint), null);
//        StringWriter writer = new StringWriter();
//        mustache.execute(writer, tokens);

        JsonNode result = null;

        ObjectNode rootNode = jackson.createObjectNode();
        rootNode.put("ticker", fund);
        rootNode.put("noAfterTaxReturns", true);
        rootNode.put("period", "MONTHLY");

        try {
            URI uri = new URI(endpoint);

            HttpRequest request = HttpRequest.newBuilder()
                .uri(uri)
                .setHeader("Accept", "application/json")
                .setHeader("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(rootNode.toString()))
                .timeout(Duration.ofSeconds(config.timeout())).build();

//            HttpClient client = HttpClient.newBuilder().build();
//            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
//
//            result = jackson.readTree(response.body());

            InputStream is = getClass().getClassLoader().getResourceAsStream("data.json");
            result  = jackson.readTree(is);

        } catch (URISyntaxException e) {

        } catch (IOException e) {
            throw new RuntimeException(e);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
        }

        return result;
    }
}
