package com.invesco.core;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import lombok.Data;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import javax.servlet.Servlet;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Map;

@Component(immediate = true, service = Servlet.class, property = {
        Constants.SERVICE_DESCRIPTION + "=ChatGPT Integration",
        "sling.servlet.methods=" + HttpConstants.METHOD_POST,
        "sling.servlet.paths=" + "/bin/openai"
})
public class ChatGptServlet extends SlingAllMethodsServlet {

    @Reference
    private transient OpenAiService openAi;

    @Reference
    private transient FundDataService fundData;

    private static final MustacheFactory mf = new DefaultMustacheFactory();
    private static final ObjectMapper jackson = new ObjectMapper();

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws IOException {

        Submission submission = jackson.readValue(request.getReader(), Submission.class);
        JsonNode data = fundData.fundData(submission.getFund());
        Map<String, Object> tokens = Map.of("fund", submission.getFund(), "data", data.toPrettyString());

        Mustache mustache = mf.compile(new StringReader(submission.getPrompt()), null);
        StringWriter writer = new StringWriter();
        mustache.execute(writer, tokens);

//        InputStream is = getClass().getClassLoader().getResourceAsStream("data.json");
//        JsonNode data  = jackson.readTree(is);

        ChatGptResponse gptResponse = openAi.completion(writer.toString());
        response.addHeader("Content-Type", "text/plain");

        String responseContent = gptResponse.getChoices().get(0).getMessage().getContent();
        response.getWriter().write(responseContent);

    }

    @Data
    static class Submission {
        private String prompt;
        private String fund;
    }

}
