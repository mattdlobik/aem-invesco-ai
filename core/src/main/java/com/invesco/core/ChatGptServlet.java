package com.invesco.core;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import javax.servlet.Servlet;
import java.io.IOException;
import java.io.InputStream;
import java.util.stream.Collectors;

@Component(immediate = true, service = Servlet.class, property = {
        Constants.SERVICE_DESCRIPTION + "=ChatGPT Integration",
        "sling.servlet.methods=" + HttpConstants.METHOD_POST,
        "sling.servlet.paths=" + "/bin/openai"
})
public class ChatGptServlet extends SlingAllMethodsServlet {

    @Reference
    private transient OpenAiService openAi;

    ObjectMapper jackson = new ObjectMapper();

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws IOException {

        String prompt = request.getReader().lines().collect(Collectors.joining());

        InputStream is = getClass().getClassLoader().getResourceAsStream("data.json");
        JsonNode data  = jackson.readTree(is);

        ChatGptResponse gptResponse = openAi.completion(prompt, data);
        response.addHeader("Content-Type", "text/plain");

        String responseContent = gptResponse.getChoices().get(0).getMessage().getContent();
        response.getWriter().write(responseContent);

    }

}
