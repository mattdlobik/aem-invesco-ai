package com.invesco.core;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "OpenAI Configuration")
public @interface OpenAiConfiguration {
    @AttributeDefinition(name = "API Key")
    String apiKey();

    @AttributeDefinition(name = "Organization")
    String organization();

    @AttributeDefinition(name = "Timeout")
    int timeout() default 10;
}
