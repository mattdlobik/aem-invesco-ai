package com.invesco.core;

public class ResourceInjectionException extends RuntimeException {
    private static final String MSG_DEFAULT = "ResourceInjectionException occurred while processing the following: ";

    public boolean includeStackTrace;

    public ResourceInjectionException(String msg) {
        super(msg);
        this.includeStackTrace = false;
    }

    public ResourceInjectionException(Exception ex, String resourcePath) {
        super(MSG_DEFAULT + resourcePath, ex);
        this.includeStackTrace = true;
    }

    public ResourceInjectionException(String msg, Exception ex) {
        super(msg, ex);
        this.includeStackTrace = true;
    }

    public ResourceInjectionException(String form, Object... args) {
        super(String.format(form, args));
        this.includeStackTrace = false;
    }
}
