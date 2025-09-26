// src/main/java/com/senac/marketing/dto/auth/RegisterRequest.java
package com.senac.marketing.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

/**
 * DTO para representar os dados de requisição de registro de um novo usuário.
 * Contém o nome, email e senha do usuário, além do ID da empresa.
 */
@Value
public class RegisterRequest {

    @NotBlank(message = "O nome não pode estar em branco")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    String nome;

    @NotBlank(message = "O email não pode estar em branco")
    @Email(message = "O email deve ter um formato válido")
    String email;

    @NotBlank(message = "A senha não pode estar em branco")
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
    String senha;

    @NotNull(message = "O ID da empresa não pode ser nulo")
    Long empresaId;
}