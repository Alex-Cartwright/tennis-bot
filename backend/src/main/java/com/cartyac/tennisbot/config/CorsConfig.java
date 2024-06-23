package com.cartyac.tennisbot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(getAllowedOrigins())
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("Authorization", "Content-Type")
                        .allowCredentials(true);
            }
        };
    }

    private String[] getAllowedOrigins() {
        String env = System.getProperty("spring.profiles.active", "development");
        System.out.println("Environment: " + env);
        if ("production".equals(env)) {
            //TODO fill this in
            return new String[]{"https://myfrontend.com"}; // Production frontend URL
        }
        return new String[]{"http://localhost:5173"}; // Development frontend URL
    }
}