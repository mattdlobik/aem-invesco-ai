package com.invesco.core;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.wcm.core.components.models.Text;
import com.invesco.core.models.PageProperty;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { GeneratedTextComponent.class, ComponentExporter.class},
    resourceType = GeneratedTextComponent.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GeneratedTextComponent implements Text {
    public static final String RESOURCE_TYPE = "invesco_ai/components/generatedtext";

    @Inject
    Resource resource;

    @Self
    @Via(type = ResourceSuperType.class)
    Text delegate;

    @PageProperty
    String summaryPrompt;

    @PageProperty
    String fundTicker;

    @ValueMapValue
    String promptTemplate;

    @PostConstruct
    void init() throws PersistenceException {
        ModifiableValueMap map = resource.adaptTo(ModifiableValueMap.class);
        if (promptTemplate == null) {
            promptTemplate = summaryPrompt;
            map.put("promptTemplate", promptTemplate);
            resource.getResourceResolver().commit();
        }

        if (fundTicker == null) {

        }


    }

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
