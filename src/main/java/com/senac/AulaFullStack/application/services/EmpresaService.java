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

    public List<EmpresaResponseDto> listar(UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();

        // ADMIN vê tudo
        if ("ADMIN".equals(usuario.getRole())) {
            return empresaRepository.findAll().stream().map(Empresa::toDto).collect(Collectors.toList());
        }

        // GERENTE/USER vê a sua
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
        empresa = empresaRepository.saveAndFlush(empresa);

        // Se não for Admin, vira GERENTE da empresa criada
        if (!"ADMIN".equals(usuario.getRole())) {
            usuario.setEmpresa(empresa);
            usuario.setRole("GERENTE"); // <--- MUDANÇA AQUI (era ADMINONG)
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