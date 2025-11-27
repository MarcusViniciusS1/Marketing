package com.senac.AulaFullStack.application.services;

import com.senac.AulaFullStack.application.dto.empresa.EmpresaRequestDto;
import com.senac.AulaFullStack.application.dto.empresa.EmpresaResponseDto;
import com.senac.AulaFullStack.application.dto.usuario.UsuarioPrincipalDto;
import com.senac.AulaFullStack.domain.entity.Empresa;
import com.senac.AulaFullStack.domain.entity.Usuario;
import com.senac.AulaFullStack.domain.repository.EmpresaRepository;
import com.senac.AulaFullStack.domain.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpresaService {

    @Autowired private EmpresaRepository empresaRepository;
    @Autowired private UsuarioRepository usuarioRepository;

    // LISTAGEM INTELIGENTE
    public List<EmpresaResponseDto> listar(UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();

        // Se for ADMIN, vê todas
        if ("ADMIN".equals(usuario.getRole())) {
            return empresaRepository.findAll().stream().map(Empresa::toDto).collect(Collectors.toList());
        }

        // Se for User/Gerente, vê apenas a sua (retorna lista com 1 item)
        if (usuario.getEmpresa() != null) {
            return List.of(usuario.getEmpresa().toDto());
        }

        return List.of();
    }

    public EmpresaResponseDto buscarPorUsuario(UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();
        if (usuario.getEmpresa() == null) return null;
        return usuario.getEmpresa().toDto();
    }

    public EmpresaResponseDto buscarPorId(Long id) {
        return empresaRepository.findById(id).map(Empresa::toDto).orElse(null);
    }

    @Transactional
    public EmpresaResponseDto cadastrar(EmpresaRequestDto dto, UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id())
                .orElseThrow(() -> new RuntimeException("Usuário logado não encontrado."));

        Empresa empresa = new Empresa(dto);
        // saveAndFlush para garantir ID imediato e evitar erro de FK
        empresa = empresaRepository.saveAndFlush(empresa);

        // Vincula criador se não for Admin (ou vincula mesmo sendo admin, opcional)
        if (!"ADMIN".equals(usuario.getRole())) {
            usuario.setEmpresa(empresa);
            usuario.setRole("GERENTE");
            usuarioRepository.save(usuario);
        }

        return empresa.toDto();
    }

    @Transactional
    public EmpresaResponseDto atualizar(Long id, EmpresaRequestDto dto) {
        Empresa empresa = empresaRepository.findById(id).orElseThrow();
        empresa.atualizar(dto);
        return empresaRepository.save(empresa).toDto();
    }

    @Transactional
    public EmpresaResponseDto atualizar(EmpresaRequestDto dto, UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();
        if (usuario.getEmpresa() == null) throw new RuntimeException("Sem empresa para editar.");

        Empresa empresa = usuario.getEmpresa();
        empresa.atualizar(dto);
        return empresaRepository.save(empresa).toDto();
    }

    public void deletar(Long id) {
        empresaRepository.deleteById(id);
    }
}