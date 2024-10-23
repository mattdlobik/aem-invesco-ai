package com.invesco.core;

import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Fund Data Service Configuration")
public @interface FundDataConfig {
    String endpoint();
    int timeout() default 10;
}
