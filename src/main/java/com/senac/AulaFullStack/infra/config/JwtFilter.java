package com.senac.AulaFullStack.infra.config;


import com.senac.AulaFullStack.application.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI(); //cara que retorna os métodos
        if (path.equals("/auth/login")
                || path.equals("auth/esqueciSenha")
                || path.equals("/usuarios")
                || (path.equals("/pets/disponiveis") && request.getMethod().equals("GET"))
                || path.equals("auth/registrarnovasenha")
                || path.startsWith("/swagger-resources")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/webjars")
                || path.startsWith("/swagger-ui")

        ) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            String header = request.getHeader("Authorization"); //qual o padrão de autenticação?
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.replace("Bearer ", "");
                var usuario = tokenService.validarToken(token);


                var autorizacao = new UsernamePasswordAuthenticationToken(
                        usuario,null,
                        usuario.autorizacao()); //pegando autorizações do usuários
                SecurityContextHolder.getContext().setAuthentication(autorizacao);

                try {
                    filterChain.doFilter(request, response);
                }catch (Exception e){
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    response.getWriter().write(e.getMessage());
                    return;
                }

            } else {
               response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Ta loko meu? ta invadindo");
                filterChain.doFilter(request , response);

                return;
            }
        }catch (Exception e){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Ta loko meu? ta invadindo");
            return;
        }
    }
}
