// src/main/java/com/senac/marketing/service/UsuarioService.java
package com.senac.marketing.service;

import com.senac.marketing.dto.auth.RegisterRequest;
import com.senac.marketing.entity.Empresa;
import com.senac.marketing.entity.Usuario;
import com.senac.marketing.enums.PerfilUsuario;
import com.senac.marketing.exception.BusinessException;
import com.senac.marketing.repository.EmpresaRepository;
import com.senac.marketing.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Serviço responsável pela lógica de negócio da entidade Usuario.
 */
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final EmpresaRepository empresaRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, EmpresaRepository empresaRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.empresaRepository = empresaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Usuario criarUsuario(RegisterRequest request) {
        usuarioRepository.findByEmail(request.getEmail())
                .ifPresent(u -> {
                    throw new BusinessException("Email já cadastrado", HttpStatus.CONFLICT);
                });

        Empresa empresa = empresaRepository.findById(request.getEmpresaId())
                .orElseThrow(() -> new BusinessException("Empresa não encontrada com ID: " + request.getEmpresaId(), HttpStatus.NOT_FOUND));

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(request.getNome());
        novoUsuario.setEmail(request.getEmail());
        novoUsuario.setSenha(passwordEncoder.encode(request.getSenha()));
        novoUsuario.setPerfil(PerfilUsuario.USUARIO_EMPRESA);
        novoUsuario.setEmpresaId(empresa.getId());

        return usuarioRepository.save(novoUsuario);
    }

    @Transactional(readOnly = true)
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Usuário não encontrado com email: " + email, HttpStatus.NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Usuário não encontrado com ID: " + id, HttpStatus.NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Usuario getUsuarioFromAuthentication(Authentication authentication) {
        // --- PONTO DA CORREÇÃO ---
        // Adicionada uma verificação para evitar o erro se a autenticação for nula
        if (authentication == null || authentication.getName() == null) {
            return null;
        }
        return buscarPorEmail(authentication.getName());
    }

    public boolean isUsuarioAdmin(Usuario usuario) {
        // Adicionada uma verificação para o caso do usuário ser nulo
        if (usuario == null) {
            return false;
        }
        return PerfilUsuario.ADMIN.equals(usuario.getPerfil());
    }
}