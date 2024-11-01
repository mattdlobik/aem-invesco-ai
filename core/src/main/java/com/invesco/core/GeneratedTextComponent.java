package com.invesco.core;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.wcm.core.components.models.Text;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.PostConstruct;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Model(adaptables = SlingHttpServletRequest.class,
        adapters = { GeneratedTextComponent.class, ComponentExporter.class },
        resourceType = GeneratedTextComponent.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GeneratedTextComponent implements Text {

    public static final String RESOURCE_TYPE = "invesco_ai/components/generatedtext";

    @Self
    private SlingHttpServletRequest request;

    @ValueMapValue
    private String promptTemplate; // The template prompt entered in the dialog

    private String fundTicker; // The stock ticker set as a page property

    @PostConstruct
    protected void init() {
        // Fetch the current page to access its properties
        Page page = request.getResourceResolver().adaptTo(PageManager.class).getContainingPage(request.getResource());

        // Retrieve the stock ticker property from the page properties
        if (page != null) {
            fundTicker = page.getProperties().get("stockTicker", String.class);
        }

        // If stockTicker is null, you may want to set a default value or handle this scenario
        if (fundTicker == null) {
            fundTicker = "DEFAULT_TICKER"; // Set a default ticker if needed
        }
    }

    public String getPromptTemplate() {
        return promptTemplate;
    }

    public String getFundTicker() {
        return fundTicker;
    }

    @Override
    public String getText() {
        // Generate or fetch text based on the prompt template and fundTicker, if required
        return promptTemplate != null && fundTicker != null
                ? promptTemplate.replace("{ticker}", fundTicker) // Placeholder replacement if needed
                : "";
    }

    @Override
    public boolean isRichText() {
        return false;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
