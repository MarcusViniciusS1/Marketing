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
                        // --- PÚBLICAS ---
                        .requestMatchers("/auth/**", "/swagger-resources/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()

                        // --- PROTEGIDAS ---

                        // Empresas:
                        .requestMatchers(HttpMethod.POST, "/empresas/cadastrar").authenticated()
                        // Listagem liberada para qualquer logado (Service filtra)
                        .requestMatchers(HttpMethod.GET, "/empresas").authenticated()
                        .requestMatchers(HttpMethod.GET, "/empresas/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/empresas/**").authenticated()

                        // Apenas Admin pode DELETAR empresas
                        .requestMatchers(HttpMethod.DELETE, "/empresas/**").hasRole("ADMIN")

                        // Usuários (Mudança aqui: GERENTE no lugar de ADMINONG)
                        .requestMatchers("/usuarios/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll() // Público para cadastro
                        .requestMatchers(HttpMethod.POST, "/usuarios/**").hasAnyRole("ADMIN", "GERENTE") // Só Admin/Gerente cria interno

                        // Campanhas e Canais
                        .requestMatchers("/campanhas/**").authenticated()
                        .requestMatchers("/canais").authenticated()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}