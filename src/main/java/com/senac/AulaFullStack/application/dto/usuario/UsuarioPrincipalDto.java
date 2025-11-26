package com.senac.AulaFullStack.application.dto.usuario;

import com.senac.AulaFullStack.domain.entity.Usuario;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

public record UsuarioPrincipalDto (Long id, String email, Collection<? extends GrantedAuthority> autorizacao) {
    public UsuarioPrincipalDto(Usuario usuario){
        this(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getAuthorities()
        );
    }
}