// src/main/java/com/senac/marketing/controller/AuthControlller.java
package com.senac.marketing.controller;

import com.senac.marketing.dto.auth.LoginRequest;
import com.senac.marketing.dto.auth.LoginResponse;
import com.senac.marketing.dto.auth.RegisterRequest;
import com.senac.marketing.entity.Usuario;
import com.senac.marketing.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador REST para endpoints de autenticação e registro.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Endpoint de registro de novo usuário.
     *
     * @param request DTO com os dados de registro.
     * @return ResponseEntity com o usuário criado e status 201 Created.
     */
    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@Valid @RequestBody RegisterRequest request) {
        Usuario novoUsuario = authService.registerUser(request);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }

    /**
     * Endpoint de login para autenticação e geração de JWT.
     *
     * @param request DTO com as credenciais de login.
     * @return ResponseEntity com o token JWT.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.loginUser(request);
        return ResponseEntity.ok(response);
    }
}