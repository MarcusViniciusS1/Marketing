// src/main/java/com/senac/marketing/dto/auth/LoginRequest.java
package com.senac.marketing.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Value;

/**
 * DTO para representar os dados de requisição de login.
 * Contém o email (login) e a senha fornecidos pelo usuário.
 */
@Value
public class LoginRequest {

    @NotBlank(message = "O email não pode estar em branco")
    @Email(message = "O email deve ter um formato válido")
    String email;

    @NotBlank(message = "A senha não pode estar em branco")
    String senha;
}