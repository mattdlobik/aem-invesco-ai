package com.invesco.core.servlets;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;

import javax.servlet.Servlet;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

@Component(
        service = {Servlet.class},
        property = {
                "sling.servlet.methods=POST",
                "sling.servlet.paths=/bin/invesco/data",
                "sling.servlet.extensions=json"
        }
)
public class InvescoDataServlet extends SlingAllMethodsServlet {

    private static final ObjectMapper mapper = new ObjectMapper();
    private static final String INVESCO_ENDPOINT = "https://www.invesco.com/us/financial-products/etfs/product-detail/main/performance/0?audienceType=Investor&action=getPerformance";

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
        // Get the ticker parameter from the request
        String ticker = request.getParameter("ticker");

        // Validate the ticker parameter
        if (ticker == null || ticker.isEmpty()) {
            response.setStatus(SlingHttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Missing or invalid 'ticker' parameter");
            return;
        }

        // Fetch data from the Invesco endpoint using the provided ticker
        Optional<JsonNode> performanceData = fetchInvescoData(ticker);

        // Check if data was successfully fetched
        if (performanceData.isEmpty()) {
            response.setStatus(SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Failed to fetch data from Invesco API");
            return;
        }

        // Return the fetched JSON data to the client
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(performanceData.get().toString());
    }

    private Optional<JsonNode> fetchInvescoData(String ticker) {
        try {
            // Build the URI, appending the ticker parameter to the endpoint
            URI uri = new URI(INVESCO_ENDPOINT + "&fund=" + ticker); // Adjust if endpoint expects ticker elsewhere

            // Build the HTTP request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .header("Accept", "application/json")
                    .build();

            // Initialize the HTTP client and send the request
            HttpClient client = HttpClient.newBuilder().build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Parse the response JSON and return as an Optional<JsonNode>
            return Optional.of(mapper.readTree(response.body()));
        } catch (URISyntaxException | IOException | InterruptedException e) {
            e.printStackTrace();
            return Optional.empty(); // Return an empty optional if an error occurs
        }
    }
}
