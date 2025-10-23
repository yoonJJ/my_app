package com.my.app.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("커플 추억 APP API")
                        .version("1.0.0")
                        .description("커플 D-Day 및 추억 아카이브 앱 API 문서")
                        .contact(new Contact()
                                .name("개발팀")
                                .email("dev@weday.com")));
    }
}
