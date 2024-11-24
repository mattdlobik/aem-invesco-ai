package com.invesco.core;

import com.adobe.cq.export.json.ComponentExporter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import static org.apache.commons.lang3.StringUtils.isEmpty;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { FundSummaryComponent.class, ComponentExporter.class},
    resourceType = FundSummaryComponent.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FundSummaryComponent extends FundPageComponent {
    public static final String RESOURCE_TYPE = "invesco_ai/components/fundsummary";

    @ResourceValueFromPageProperty
    String summaryPrompt;

    @Override
    public String getText() {
        String text = delegate.getText();
        if (isEmpty(text)) {
            text = generateText(summaryPrompt);
            setText(text);
        }

        return text;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
