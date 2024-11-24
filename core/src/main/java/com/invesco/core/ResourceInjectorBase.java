package com.invesco.core;

import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.adapter.Adaptable;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.spi.Injector;
import org.apache.sling.models.spi.injectorspecific.StaticInjectAnnotationProcessorFactory;
import java.lang.reflect.*;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.Temporal;
import java.util.*;
import static org.apache.commons.lang3.StringUtils.isNotBlank;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

@Slf4j
public abstract class ResourceInjectorBase implements Injector, StaticInjectAnnotationProcessorFactory {
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

        if (isNotBlank(annotatedName)) {
            name = annotatedName;

        } else {
            if (element instanceof Field) {
                Field field = (Field) element;
                name = field.getName();
            } else if (element instanceof Parameter) {
                Parameter parameter = (Parameter) element;
                name = parameter.getName();
            }
        }

        return name;
    }

    protected Object processValue(Object rawValue, String fieldName, Type fieldType,
                                  String format, ResourceResolver resolver, String resourcePath) {
        Object value;

        if (fieldType instanceof ParameterizedType || ((Class<?>) fieldType).isArray() || rawValue instanceof Object[]) {
            Object[] rawMultipleValue;

            try {
                rawMultipleValue = (Object[]) rawValue;
            } catch (ClassCastException e) {
                rawMultipleValue = new Object[] {rawValue};
            }

            value = processMultipleValue(rawMultipleValue,
                    fieldName, fieldType, format,
                    resolver, resourcePath);

        } else {
            try {
                value = processSingleValue(rawValue, (Class<?>) fieldType, format, resolver);
            } catch (Exception e) {
                throw new ResourceInjectionException(e, resourcePath);
            }
        }

        return value;
    }

    protected Object processMultipleValue(Object[] rawValues, String fieldName, Type fieldType,
                                          String format, ResourceResolver resolver, String resourcePath) {
        List<Object> values = new ArrayList<>();

        boolean fieldIsArray;
        Class<?> fieldClass;

        if (fieldType instanceof ParameterizedType) {
            fieldIsArray = false;
            ParameterizedType parameterizedType = (ParameterizedType) fieldType;
            Type rawType = parameterizedType.getRawType();

            if (rawType.equals(List.class)) {
                Type actualType = parameterizedType.getActualTypeArguments()[0];

                if (actualType instanceof Class<?>) {
                    fieldClass = (Class<?>) actualType;
                } else {
                    throw new ResourceInjectionException("Only one level of parameterized field types supported" +
                            "(nested type: '%s')", actualType.getTypeName());
                }
            } else {
                throw new ResourceInjectionException("Only List parameterized field types are supported (provided type: '%s')",
                        rawType.getTypeName());
            }

        } else if (((Class<?>) fieldType).isArray()) {
            fieldIsArray = true;
            fieldClass = ((Class<?>) fieldType).getComponentType();

            if (fieldClass.isArray()) {
                throw new ResourceInjectionException("Only single dimensional array field types supported (provided type: '%s')",
                        fieldType.getTypeName());
            }
        } else {
            throw new ResourceInjectionException("JCR data is multiple, but provided field is singular");
        }

        if (rawValues != null) {
            for (Object singleRawValue : rawValues) {
                try {
                    Object value = processSingleValue(singleRawValue, fieldClass, format, resolver);
                    if (value != null) {
                        values.add(value);
                    }
                } catch (ResourceInjectionException e) {
                    if (e.includeStackTrace) {
                        log.error("There was a problem injecting data into field '{}' for resource '{}'", fieldName, resourcePath, e);
                    } else {
                        log.error(String.format("There was a problem injecting data into field '{}' for resource '{}' -- " +
                                "%s", e), fieldName, resourcePath);
                    }
                }
            }
        }

        return fieldIsArray
                ? values.toArray((Object[]) Array.newInstance(fieldClass, 0))
                : values;
    }

    protected <T> T processSingleValue(Object rawValue, Class<T> fieldClass, String format, ResourceResolver resolver) {
        T value = null;

        if (rawValue != null) {
            Class<?> valueClass = rawValue.getClass();

            if (fieldClass.isAssignableFrom(valueClass)) {
                value = fieldClass.cast(rawValue);

            } else if (Number.class.isAssignableFrom(valueClass)) {
                value = processNumber((Number) rawValue, fieldClass, format);

            } else if (Calendar.class.isAssignableFrom(valueClass)) {
                value = processCalendar((Calendar) rawValue, fieldClass, format);

            } else if (fieldClass.isAnnotationPresent(Model.class) || Adaptable.class.isAssignableFrom(fieldClass)) {
                String stringValue = (String) rawValue;
                Resource valueResource = resolver.getResource(stringValue);

                if (valueResource != null) {
                    value = valueResource.adaptTo(fieldClass);
                } else {
                    throw new ResourceInjectionException("No resource found at path '%s'", rawValue);
                }
            } else {
                try {
                    Constructor<?> constructor = fieldClass.getDeclaredConstructor(rawValue.getClass());
                    value = fieldClass.cast(constructor.newInstance(rawValue));
                } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                    throw new ResourceInjectionException(String.format("Failed to construct new instance of class '%s' " +
                            "from value '%s'", fieldClass.getSimpleName(), rawValue), e);
                }
            }
        }

        return value;
    }

    public static <T> T processNumber(Number rawValue, Class<T> fieldClass, String format) {
        T value = null;

        if (Integer.class.isAssignableFrom(fieldClass)) {
            value = fieldClass.cast(rawValue.intValue());
        } else if (Long.class.isAssignableFrom(fieldClass)) {
            value = fieldClass.cast(rawValue.longValue());
        } else if (Float.class.isAssignableFrom(fieldClass)) {
            value = fieldClass.cast(rawValue.floatValue());
        } else if (Double.class.isAssignableFrom(fieldClass)) {
            value = fieldClass.cast(rawValue.doubleValue());
        } else if (Short.class.isAssignableFrom(fieldClass)) {
            value = fieldClass.cast((rawValue.shortValue()));
        } else if (String.class.isAssignableFrom(fieldClass)) {
            value = fieldClass.cast(String.valueOf(rawValue));
        } else {
            throw new ResourceInjectionException("Type mismatch between Number '%d' and fieldClass '%s'",
                    rawValue, fieldClass.getSimpleName());
        }

        return value;
    }

    public static <T> T processCalendar(Calendar rawValue, Class<T> fieldClass, String format) {
        T value = null;

        if (Temporal.class.isAssignableFrom(fieldClass)) {
            Instant instant = rawValue.toInstant();
            ZoneId zone = ZoneOffset.UTC;
//            ZoneId zone = rawValue.getTimeZone().toZoneId();

            if (Instant.class.isAssignableFrom(fieldClass)) {
                value = fieldClass.cast(instant);
            } else if (LocalDateTime.class.isAssignableFrom(fieldClass)) {
                value = fieldClass.cast(LocalDateTime.ofInstant(instant, zone));
            } else if (LocalDate.class.isAssignableFrom(fieldClass)) {
                value = fieldClass.cast(LocalDate.ofInstant(instant, zone));
            } else if (LocalTime.class.isAssignableFrom(fieldClass)) {
                value = fieldClass.cast(LocalTime.ofInstant(instant, zone));
            } else if (ZonedDateTime.class.isAssignableFrom(fieldClass)) {
                value = fieldClass.cast(ZonedDateTime.ofInstant(instant, zone));
            }

        } else if (Date.class.isAssignableFrom(fieldClass)) {
            value = fieldClass.cast(rawValue.getTime());

        } else if (String.class.isAssignableFrom(fieldClass)) {
            if (isNotEmpty(format)) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format, Locale.getDefault());
                LocalDate d = LocalDate.ofInstant(rawValue.toInstant(), ZoneOffset.UTC);
                value = fieldClass.cast(formatter.format(d));
            }

        } else {
            log.error("Type mismatch between Calendar value '{}' and fieldClass '{}'", rawValue, fieldClass.getSimpleName());
        }

        return value;
    }


}
