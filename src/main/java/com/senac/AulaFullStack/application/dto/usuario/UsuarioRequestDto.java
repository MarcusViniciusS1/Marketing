package com.senac.AulaFullStack.application.dto.usuario;

public record UsuarioRequestDto(
        Long id,
        String nome,
        String cpf,
        String senha,
        String email,
        String role,
        String telefone,
        Long empresaId
) {}