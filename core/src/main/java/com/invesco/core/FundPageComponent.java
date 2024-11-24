package com.invesco.core;

import com.adobe.cq.wcm.core.components.models.Text;
import com.fasterxml.jackson.databind.JsonNode;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import javax.inject.Inject;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Map;
import static java.util.Objects.requireNonNull;

public abstract class FundPageComponent implements Text {
    private static final MustacheFactory mf = new DefaultMustacheFactory();

    @Self
    @Via(type = ResourceSuperType.class)
    Text delegate;

    @Inject
    Resource resource;

    @OSGiService
    OpenAiService openAiService;

    @OSGiService
    FundDataService fundDataService;

    @PageProperty
    String fundTicker;

    @PageProperty
    String tone;

    public String generateText(String prompt) {
        JsonNode fundData = fundDataService.fundData(fundTicker);
        Map<String, Object> tokens = Map.of("fundTicker", fundTicker, "fundData", fundData.toString());
        Mustache mustache = mf.compile(new StringReader(prompt), null);

        StringWriter writer = new StringWriter();
        mustache.execute(writer, tokens);

        ChatGptResponse gptResponse = openAiService.completion(tone, writer.toString());
        return gptResponse.getChoices().get(0).getMessage().getContent();

    }

    public void setText(String text) {
        ModifiableValueMap properties = requireNonNull(resource.adaptTo(ModifiableValueMap.class));
        properties.put("text", text);
        try {
            resource.getResourceResolver().commit();
        } catch (PersistenceException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public boolean isRichText() {
        return delegate.isRichText();
    }

}
