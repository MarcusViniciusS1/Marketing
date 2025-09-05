package com.senac.aulafull.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI().info(new Info()
                .title("Gerenciador de Campanhas de Marketing")
                .version("1.0")
                .description("Projeto de um Gerenciador de Campanhas de Marketing , executado na aula de FullStack, 4ª fase - Senac"));
    }
}
