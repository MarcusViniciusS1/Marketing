// src/main/java/com/senac/marketing/dto/auth/LoginResponse.java
package com.senac.marketing.dto.auth;

import lombok.Value;

/**
 * DTO para representar a resposta do servidor após um login bem-sucedido.
 * Contém o token JWT para autenticação subsequente.
 */
@Value
public class LoginResponse {
    String token;
}