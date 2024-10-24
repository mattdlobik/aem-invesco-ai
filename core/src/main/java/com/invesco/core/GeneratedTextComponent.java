package com.invesco.core;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.wcm.core.components.models.Text;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { GeneratedTextComponent.class, ComponentExporter.class},
    resourceType = GeneratedTextComponent.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GeneratedTextComponent implements Text {
    public static final String RESOURCE_TYPE = "invesco_ai/components/generatedtext";

    @Self
    @Via(type = ResourceSuperType.class)
    Text delegate;

    @ValueMapValue
    String promptTemplate;

    @ValueMapValue
    String fundTicker;

    @Override
    public String getText() {
        return delegate.getText();
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