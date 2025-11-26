package com.senac.AulaFullStack.infra.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception{
        return http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(org.springframework.security.config.http.SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests( auth -> auth
                        // --- Rotas Públicas ---
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/swagger-resources/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Se quiser cadastro público sem login, mude para permitAll()
                        // Aqui assumimos que o usuário já criou conta e está logado para criar a empresa
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()

                        // --- Rotas Protegidas ---

                        // Empresas
                        .requestMatchers(HttpMethod.POST, "/empresas/cadastrar").authenticated()
                        .requestMatchers(HttpMethod.GET, "/empresas").authenticated() // Liberado listagem para todos logados (debug)
                        .requestMatchers(HttpMethod.GET, "/empresas/minha").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/empresas/minha").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/empresas/**").hasAnyRole("ADMIN", "ADMINONG")
                        .requestMatchers(HttpMethod.DELETE, "/empresas/**").hasRole("ADMIN")

                        // Usuários
                        .requestMatchers(HttpMethod.GET , "/usuarios/minha-empresa").authenticated()
                        .requestMatchers(HttpMethod.GET , "/usuarios").authenticated() // Liberado listagem geral (debug)

                        // Campanhas e Canais
                        .requestMatchers("/campanhas/**").authenticated()
                        .requestMatchers("/canais").authenticated()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}