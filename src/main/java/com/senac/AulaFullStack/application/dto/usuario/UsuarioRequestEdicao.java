package com.senac.AulaFullStack.application.dto.usuario;

public record UsuarioRequestEdicao(
        Long id,
        String nome,
        String cpf,
        String email,
        String role,
        String telefone,
        Long empresaId
) {}