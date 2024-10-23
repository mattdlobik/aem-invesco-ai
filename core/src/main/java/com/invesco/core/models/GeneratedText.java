package com.invesco.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;


@Model(adaptables = SlingHttpServletRequest.class,
adapters = { GeneratedText.class, ComponentExporter.class},
resourceType = "",
defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GeneratedText implements ComponentExporter {
    public static final String RESOURCE_TYPE = "";

    @Override
    public String getExportedType() {
        return "";
    }
}
