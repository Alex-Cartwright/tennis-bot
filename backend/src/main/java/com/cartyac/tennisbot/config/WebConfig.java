package com.cartyac.tennisbot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String[] ALLOWED_DEV_ORIGINS = new String[]{"http://localhost:5173"};
    private static final String[] ALLOWED_PRODUCTION_ORIGINS = new String[]{
            "https://tennis-bot-2e567.firebaseapp.com",
            "https://tennis-bot-2e567.web.app"
    };

    private final Environment env;

    @Autowired
    public WebConfig(Environment env) {
        this.env = env;
    }

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
        if ("production".equals(envProfile)) {
            return ALLOWED_PRODUCTION_ORIGINS;
        }
        return ALLOWED_DEV_ORIGINS;
    }
}
