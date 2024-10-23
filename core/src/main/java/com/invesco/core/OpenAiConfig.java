package com.invesco.core;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "OpenAI Service Configuration")
public @interface OpenAiConfig {
    @AttributeDefinition(name = "API Key")
    String apiKey();

    @AttributeDefinition(name = "Organization")
    String organization();

    @AttributeDefinition(name = "Timeout")
    int timeout() default 10;
}
