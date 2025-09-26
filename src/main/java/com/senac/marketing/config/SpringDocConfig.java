// SpringDocConfig

package com.senac.marketing.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Classe de configuração para o SpringDoc OpenAPI (Swagger UI).
 * Define informações gerais da API e configura o esquema de segurança (JWT Bearer Token)
 * para que seja possível testar endpoints protegidos diretamente pelo Swagger UI.
 */
@Configuration
public class SpringDocConfig {

    /**
     * Configura o objeto OpenAPI que descreve a API.
     * Inclui informações básicas da API e a configuração para o JWT (Bearer Token).
     */
    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("API Gerenciador de Marketing")
                        .description("API RESTful para gerenciar campanhas e métricas de marketing de múltiplas empresas.")
                        .version("1.0.0")
                )
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                );
    }
}