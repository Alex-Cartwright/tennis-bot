package com.cartyac.tennisbot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private Environment env;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(getAllowedOrigins())
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Authorization", "Content-Type")
                .allowCredentials(true);
    }

    private String[] getAllowedOrigins() {
        String envProfile = env.getProperty("spring.profiles.active", "development");
        System.out.println("Environment: " + envProfile);
        if ("production".equals(envProfile)) {
            return new String[]{"https://tennis-bot-2e567.firebaseapp.com", "https://tennis-bot-2e567.web.app"}; // Production frontend URL
        }
        return new String[]{"http://localhost:5173"}; // Development frontend URL
    }
}
