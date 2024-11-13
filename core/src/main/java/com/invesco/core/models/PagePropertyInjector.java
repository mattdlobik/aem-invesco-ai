package com.invesco.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.drew.lang.annotations.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.spi.DisposalCallbackRegistry;
import org.apache.sling.models.spi.Injector;
import org.apache.sling.models.spi.injectorspecific.InjectAnnotationProcessor2;
import org.apache.sling.models.spi.injectorspecific.StaticInjectAnnotationProcessorFactory;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Field;
import java.lang.reflect.Parameter;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Calendar;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

@Slf4j
@Component(property = { Constants.SERVICE_RANKING + ":Integer=5999" }, service = Injector.class)
public class PagePropertyInjector implements Injector, StaticInjectAnnotationProcessorFactory {
    public static final String NAME = "page-property";

    public static Resource getResourceAdaptable(final Object adaptable) {
        Resource result;

        if (adaptable instanceof Resource) {
            result = (Resource) adaptable;

        } else if (adaptable instanceof SlingHttpServletRequest) {
            result = ((SlingHttpServletRequest) adaptable).getResource();

        } else {
            log.error("Cannot fetch tags from adaptable <{}>. Adaptable must be one of: <{}>",
                    adaptable.getClass(),
                    Arrays.asList(SlingHttpServletRequest.class, Resource.class));

            result = null;
        }

        if (result == null) {
            log.error("{} is not a valid Resource", adaptable);
        }

        return result;
    }

    public static String elementName(AnnotatedElement element, String annotatedName) {
        String name = null;

        if (element instanceof Field) {
            Field field = (Field) element;
            name = field.getName();
        } else if (element instanceof Parameter) {
            Parameter parameter = (Parameter) element;
            name = parameter.getName();
        }

        if (isNotBlank(annotatedName)) {
            name = annotatedName;
        }

        return name;
    }

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

        if (!element.isAnnotationPresent(PageProperty.class)) {
            return null;
        }

        final Resource resource = getResourceAdaptable(adaptable);
        if (resource == null) {
            return null;
        }

        final ResourceResolver resolver = resource.getResourceResolver();

        final PageManager pageManager = resolver.adaptTo(PageManager.class);
        if (pageManager == null) {
            log.error("Could not get page manager from resource <{}>", resource.getPath());
            return null;
        }

        Object value;

        Page page = pageManager.getContainingPage(resource);
        do {
            value = page.getProperties().get(name);
            page = page.getParent();
        } while (value == null && page != null);

        if (value != null) {

            if (declaredType.equals(value.getClass())) {
                return value;

            } else if (declaredType.equals(boolean.class) || declaredType.equals(Boolean.class)) {
                return Boolean.parseBoolean((String) value);

            } else if (declaredType.equals(int.class) || declaredType.equals(Integer.class)) {
                return Integer.parseInt((String) value);

            } else if (declaredType.equals(long.class) || declaredType.equals(Long.class)) {
                return Long.parseLong((String) value);

            } else if (declaredType.equals(LocalDate.class)) {
                Calendar calendarValue = (Calendar) value;
                return LocalDate.ofInstant(calendarValue.toInstant(), ZoneId.systemDefault());

            } else {
                String path = (String) value;
                Resource fragmentResource = resolver.getResource(path);
                if (fragmentResource != null) {
                    return fragmentResource.adaptTo((Class<?>) declaredType);
                }
            }
        }

        return value;
    }

    @Override
    public InjectAnnotationProcessor2 createAnnotationProcessor(AnnotatedElement element) {
        if (element.isAnnotationPresent(PageProperty.class)) {
            return new PagePropertyProcessor(element);
        }

        return null;
    }

    public static class PagePropertyProcessor implements InjectAnnotationProcessor2 {

        private final PageProperty annotation;
        private final String name;

        public PagePropertyProcessor(AnnotatedElement element) {
            annotation = element.getAnnotation(PageProperty.class);
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

