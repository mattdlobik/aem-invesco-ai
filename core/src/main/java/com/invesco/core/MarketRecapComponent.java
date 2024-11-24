package com.invesco.core;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.wcm.core.components.models.Text;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import static org.apache.commons.lang3.StringUtils.isEmpty;

@Model(adaptables = SlingHttpServletRequest.class,
        adapters = { MarketRecapComponent.class, ComponentExporter.class},
        resourceType = MarketRecapComponent.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MarketRecapComponent extends FundPageComponent implements Text {
    public static final String RESOURCE_TYPE = "invesco_ai/components/marketrecap";

    @ResourceValueFromPageProperty
    String recapPrompt;

    @Override
    public String getText() {
        String text = delegate.getText();
        if (isEmpty(text)) {
            text = generateText(recapPrompt);
            setText(text);
        }

        return text;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
