package com.invesco.core;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.wcm.core.components.models.Text;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import com.invesco.core.models.ResourceValueFromPageProperty;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import javax.inject.Inject;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Map;
import static java.util.Objects.requireNonNull;
import static org.apache.commons.lang3.StringUtils.isEmpty;

@Model(adaptables = SlingHttpServletRequest.class,
        adapters = { MarketRecapComponent.class, ComponentExporter.class},
        resourceType = MarketRecapComponent.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MarketRecapComponent implements Text {
    public static final String RESOURCE_TYPE = "invesco_ai/components/marketrecap";
    private static final MustacheFactory mf = new DefaultMustacheFactory();

    @Inject
    Resource resource;

    @Self
    @Via(type = ResourceSuperType.class)
    Text delegate;

    @OSGiService
    OpenAiService openAiService;

    @ResourceValueFromPageProperty
    String recapPrompt;

    @ResourceValueFromPageProperty
    String fundTicker;

    @Override
    public String getText() {
        String text = delegate.getText();
        if (isEmpty(text)) {
            Map<String, Object> tokens = Map.of("fund", fundTicker);
            Mustache mustache = mf.compile(new StringReader(recapPrompt), null);

            StringWriter writer = new StringWriter();
            mustache.execute(writer, tokens);

            ChatGptResponse gptResponse = openAiService.completion(writer.toString());
            text = gptResponse.getChoices().get(0).getMessage().getContent();
            ModifiableValueMap properties = requireNonNull(resource.adaptTo(ModifiableValueMap.class));
            properties.put("text", text);
            try {
                resource.getResourceResolver().commit();
            } catch (PersistenceException e) {
                throw new RuntimeException(e);
            }
        }

        return text;
    }

    @Override
    public boolean isRichText() {
        return delegate.isRichText();
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
