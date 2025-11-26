package com.senac.AulaFullStack.application.dto.usuario;

import com.senac.AulaFullStack.domain.entity.Usuario;

public record UsuarioResumoDto(Long id, String nome, String email, String telefone, String role) {
    public UsuarioResumoDto(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getTelefone(),
                usuario.getRole()
        );
    }
}