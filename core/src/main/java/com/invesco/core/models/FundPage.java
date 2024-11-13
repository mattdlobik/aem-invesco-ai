package com.invesco.core.models;

import com.adobe.cq.wcm.core.components.util.AbstractComponentImpl;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FundPage extends AbstractComponentImpl {

    @ValueMapValue
    String fundTicker;

    @ValueMapValue
    String summaryPrompt;

}
