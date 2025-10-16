// src/main/java/com/senac/marketing/service/AuthService.java
package com.senac.marketing.service;

import com.senac.marketing.dto.auth.LoginRequest;
import com.senac.marketing.dto.auth.LoginResponse;
import com.senac.marketing.dto.auth.RegisterRequest;
import com.senac.marketing.entity.Usuario;
import com.senac.marketing.exception.BusinessException;
import com.senac.marketing.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Serviço responsável pela lógica de autenticação.
 */
@Service
public class AuthService {

    private final UsuarioService usuarioService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UsuarioService usuarioService,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public Usuario registerUser(RegisterRequest request) {
        return usuarioService.criarUsuario(request);
    }

    @Transactional(readOnly = true)
    public LoginResponse loginUser(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
            );

            String userEmail = authentication.getName();
            String token = jwtService.generateToken(userEmail);

            // Busca os dados do usuário para incluir na resposta
            Usuario usuario = usuarioService.buscarPorEmail(userEmail);

            LoginResponse.UserResponse userResponse = new LoginResponse.UserResponse(
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getPerfil()
            );

            return new LoginResponse(token, userResponse);

        } catch (Exception e) {
            throw new BusinessException("Credenciais inválidas", HttpStatus.UNAUTHORIZED);
        }
    }
}