package com.invesco.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;
import java.util.Collections;

@Model(
        adaptables = Resource.class,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class NavigationModel {

    @ValueMapValue
    private String logoImage;

    @ValueMapValue
    private String buttonText;

    @ValueMapValue
    private String buttonURL;

    @ValueMapValue
    private List<NavigationLink> links;

    public String getLogoImage() {
        return logoImage;
    }

    public String getButtonText() {
        return buttonText;
    }

    public String getButtonURL() {
        return buttonURL;
    }

    public List<NavigationLink> getLinks() {
        return links != null ? links : Collections.emptyList();
    }

    @Model(
            adaptables = Resource.class,
            defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
    )
    public static class NavigationLink {
        @ValueMapValue
        private String text;

        @ValueMapValue
        private String url;

        public String getText() {
            return text;
        }

        public String getUrl() {
            return url;
        }
    }
}