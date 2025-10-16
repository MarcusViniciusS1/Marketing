package com.senac.marketing.application.dto.auth.Usuario;


import com.senac.marketing.domain.entity.Usuario; // Import ajustado
import com.senac.marketing.domain.enums.PerfilUsuario; // Import ajustado
import lombok.Data;

@Data
public class UsuarioResponse {
    private Long id;
    private String nome;
    private String email;
    private PerfilUsuario perfil;

    public UsuarioResponse(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.perfil = usuario.getPerfil();
    }
}