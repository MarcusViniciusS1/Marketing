// src/main/java/com/senac/marketing/dto/auth/LoginResponse.java
package com.senac.marketing.dto.auth;

import com.senac.marketing.enums.PerfilUsuario;
import lombok.Value;

/**
 * DTO para representar a resposta do servidor após um login bem-sucedido.
 * Contém o token JWT e os dados básicos do usuário.
 */
@Value
public class LoginResponse {
    String token;
    UserResponse user;

    @Value
    public static class UserResponse {
        String nome;
        String email;
        PerfilUsuario perfil;
    }
}