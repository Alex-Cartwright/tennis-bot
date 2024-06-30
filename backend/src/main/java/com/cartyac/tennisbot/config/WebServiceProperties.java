package com.cartyac.tennisbot.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "web.service")
public class WebServiceProperties {

    private String username;
    private String password;
}
