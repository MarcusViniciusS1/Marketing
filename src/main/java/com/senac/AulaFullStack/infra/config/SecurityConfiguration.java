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
                        .requestMatchers(HttpMethod.POST, "/empresas/cadastrar").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()

                        // Liberado listar empresas publicamente para o Select do Cadastro
                        .requestMatchers(HttpMethod.GET, "/empresas").permitAll()

                        // --- Rotas Protegidas ---

                        // Empresas
                        .requestMatchers(HttpMethod.GET, "/empresas/minha").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/empresas/minha").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/empresas/**").hasAnyRole("ADMIN", "ADMINONG")
                        .requestMatchers(HttpMethod.DELETE, "/empresas/**").hasRole("ADMIN")

                        // Usuários
                        .requestMatchers(HttpMethod.GET , "/usuarios/minha-empresa").authenticated()
                        .requestMatchers(HttpMethod.GET , "/usuarios").authenticated()
                        .requestMatchers(HttpMethod.PUT , "/usuarios/editar").authenticated() // Edição de usuário

                        // Campanhas e Canais
                        .requestMatchers("/campanhas/**").authenticated()
                        .requestMatchers("/canais").authenticated()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}