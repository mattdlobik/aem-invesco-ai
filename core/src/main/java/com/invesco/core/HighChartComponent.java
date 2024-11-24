package com.invesco.core;

import com.adobe.cq.export.json.ComponentExporter;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.PostConstruct;

@Model(adaptables = SlingHttpServletRequest.class,
        adapters = { HighChartComponent.class, ComponentExporter.class},
        resourceType = HighChartComponent.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HighChartComponent {
    public static final String RESOURCE_TYPE = "invesco_ai/components/highchart";

    @OSGiService
    FundDataService fundDataService;

    @PageProperty
    String fundTicker;

    JsonNode fundData;

    @PostConstruct
    public void init() {
        fundData = fundDataService.fundData(fundTicker);
    }

}
