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
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/swagger-resources/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()

                        // --- PROTEGIDAS ---

                        // Empresas:
                        // - Cadastrar: Exige login para vincular o dono
                        .requestMatchers(HttpMethod.POST, "/empresas/cadastrar").authenticated()

                        // - Listar: Apenas ADMIN vê todas as empresas
                        .requestMatchers(HttpMethod.GET, "/empresas").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/empresas/minha").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/empresas/minha").authenticated()

                        // - Ações Administrativas
                        .requestMatchers(HttpMethod.PUT, "/empresas/**").hasAnyRole("ADMIN", "GERENTE")
                        .requestMatchers(HttpMethod.DELETE, "/empresas/**").hasRole("ADMIN")

                        // Usuários
                        .requestMatchers(HttpMethod.GET , "/usuarios/minha-empresa").authenticated()
                        .requestMatchers(HttpMethod.GET , "/usuarios").hasRole("ADMIN") // Só Admin lista todos

                        // Campanhas e Canais
                        .requestMatchers("/campanhas/**").authenticated()
                        .requestMatchers("/canais").authenticated()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}