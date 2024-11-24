package com.invesco.core;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.drew.lang.annotations.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.adapter.Adaptable;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.spi.DisposalCallbackRegistry;
import org.apache.sling.models.spi.Injector;
import org.apache.sling.models.spi.injectorspecific.InjectAnnotationProcessor2;
import org.apache.sling.models.spi.injectorspecific.StaticInjectAnnotationProcessorFactory;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import java.lang.reflect.*;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.Temporal;
import java.util.*;
import static org.apache.commons.lang3.StringUtils.isNotBlank;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

@Slf4j
@Component(property = { Constants.SERVICE_RANKING + ":Integer=5999" }, service = Injector.class)
public class ResourceValueFromPagePropertyInjector extends ResourceInjectorBase {
    public static final String NAME = "page-defaulted-property";


    @Override
    public @NotNull String getName() {
        return NAME;
    }

    @Override
    public Object getValue(final @NotNull Object adaptable,
                           final String name,
                           final @NotNull Type declaredType,
                           final AnnotatedElement element,
                           final @NotNull DisposalCallbackRegistry callbackRegistry) {

        if (!element.isAnnotationPresent(ResourceValueFromPageProperty.class)) {
            return null;
        }

        Resource resource = getResourceAdaptable(adaptable);
        if (resource == null) {
            return null;
        }

        ResourceValueFromPageProperty annotation = element.getAnnotation(ResourceValueFromPageProperty.class);
        String propertyName = elementName(element, annotation.name());
        String propertyPrefix = annotation.prefix();

        if (isNotEmpty(propertyPrefix)) {
            resource = resource.getChild(propertyPrefix);
            if (resource == null) {
                throw new ResourceInjectionException("Resource not found at specified prefix: {}", propertyPrefix);
            }
        }

        Object rawValue = resource.getValueMap().get(propertyName);
        final ResourceResolver resolver = resource.getResourceResolver();

        if (rawValue == null) {

            final PageManager pageManager = resolver.adaptTo(PageManager.class);
            if (pageManager == null) {
                log.error("Could not get page manager from resource <{}>", resource.getPath());
                return null;
            }

            Page page = pageManager.getContainingPage(resource);
            do {
                rawValue = page.getProperties().get(name);
                page = page.getParent();
            } while (rawValue == null && page != null);

            if (rawValue != null) {
                ModifiableValueMap map = resource.adaptTo(ModifiableValueMap.class);
                map.put(propertyName, rawValue);
                try {
                    resolver.commit();
                } catch (PersistenceException e) {
                    throw new ResourceInjectionException("Unable to save properties", e);
                }
            }
        }

        Object value = null;

        try {
            value = processValue(rawValue, propertyName, declaredType, annotation.format(), resolver, resource.getPath());
        } catch (ResourceInjectionException e) {
            if (e.includeStackTrace) {
                log.error("There was a problem injecting data into field '{}' for resource '{}'", name, resource.getPath(), e);
            } else {
                log.error(String.format("There was a problem injecting data into field '{}' for resource '{}' -- " +
                        "%s", e), name, resource.getPath());
            }
        }

        return value;
    }



    @Override
    public InjectAnnotationProcessor2 createAnnotationProcessor(AnnotatedElement element) {
        if (element.isAnnotationPresent(ResourceValueFromPageProperty.class)) {
            return new PagePropertyProcessor(element);
        }

        return null;
    }

    public static class PagePropertyProcessor implements InjectAnnotationProcessor2 {

        private final ResourceValueFromPageProperty annotation;
        private final String name;

        public PagePropertyProcessor(AnnotatedElement element) {
            annotation = element.getAnnotation(ResourceValueFromPageProperty.class);
            String annotatedName = annotation != null ? annotation.name() : null;

            name = elementName(element, annotatedName);
        }

        @Override
        public String getName() {
            return name;
        }

        @Override
        public String getVia() {
            return null;
        }

        @Override
        public boolean hasDefault() {
            return false;
        }

        @Override
        public Object getDefault() {
            return null;
        }

        @Override
        public Boolean isOptional() {
            if (annotation != null) {
                return annotation.injectionStrategy() == InjectionStrategy.OPTIONAL;
            }

            return null;
        }

        @Override
        public InjectionStrategy getInjectionStrategy() {
            if (annotation != null) {
                return annotation.injectionStrategy();
            }

            return InjectionStrategy.DEFAULT;
        }
    }

}

