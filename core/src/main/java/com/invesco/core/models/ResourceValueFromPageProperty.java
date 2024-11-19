package com.invesco.core.models;

import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.spi.injectorspecific.InjectAnnotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static org.apache.commons.lang3.StringUtils.EMPTY;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@InjectAnnotation @Source(ResourceValueFromPagePropertyInjector.NAME)
public @interface ResourceValueFromPageProperty {

    String name() default EMPTY;
    String prefix() default EMPTY;
    String format() default EMPTY;

    String pagePropertyName() default EMPTY;
    String pagePropertyPrefix() default EMPTY;

    InjectionStrategy injectionStrategy() default InjectionStrategy.OPTIONAL;
}
