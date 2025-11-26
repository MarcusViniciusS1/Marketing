package com.senac.AulaFullStack.domain.entity;

import com.senac.AulaFullStack.application.dto.usuario.UsuarioRequestDto;
import com.senac.AulaFullStack.application.dto.usuario.UsuarioResponseDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true)
    private String cpf;

    private String senha;

    @Column(unique = true)
    private String email;

    private String telefone;
    private LocalDateTime dataCadastro;
    private String role;

    private String tokenSenha;

    // OBRIGATÓRIO: nullable = true para permitir usuários sem empresa
    @ManyToOne
    @JoinColumn(name="empresa_id", nullable = true)
    private Empresa empresa;

    public Usuario(UsuarioRequestDto dto, Empresa empresa) {
        this.nome = dto.nome();
        this.cpf = dto.cpf();
        this.email = dto.email();
        this.senha = dto.senha();
        this.telefone = dto.telefone();
        this.role = dto.role();
        this.empresa = empresa; // Pode ser null
        this.dataCadastro = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role));
    }

    @Override
    public String getPassword() { return this.senha; }
    @Override
    public String getUsername() { return this.email; }
    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }

    public UsuarioResponseDto toDtoResponse() {
        return new UsuarioResponseDto(id, nome, email, role, empresa != null ? empresa.getId() : null);
    }
}