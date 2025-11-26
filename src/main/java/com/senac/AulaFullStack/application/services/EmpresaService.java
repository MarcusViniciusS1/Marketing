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

    // --- Métodos para o Usuário (Minha Empresa) ---
    public EmpresaResponseDto buscarPorUsuario(UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();
        if (usuario.getEmpresa() == null) return null;
        return usuario.getEmpresa().toDto();
    }

    @Transactional
    public EmpresaResponseDto cadastrar(EmpresaRequestDto dto, UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();
        Empresa empresa = new Empresa(dto);
        empresaRepository.save(empresa);
        usuario.setEmpresa(empresa);
        usuarioRepository.save(usuario);
        return empresa.toDto();
    }

    @Transactional
    public EmpresaResponseDto atualizar(EmpresaRequestDto dto, UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();
        Empresa empresa = usuario.getEmpresa();
        if(empresa == null) throw new RuntimeException("Usuário não possui empresa");
        empresa.atualizar(dto);
        return empresaRepository.save(empresa).toDto();
    }

    // --- NOVOS MÉTODOS PARA ADMINISTRAÇÃO ---

    public List<EmpresaResponseDto> listarTodas() {
        return empresaRepository.findAll().stream()
                .map(Empresa::toDto)
                .collect(Collectors.toList());
    }

    public EmpresaResponseDto buscarPorId(Long id) {
        return empresaRepository.findById(id)
                .map(Empresa::toDto)
                .orElse(null);
    }

    @Transactional
    public EmpresaResponseDto atualizarPorId(Long id, EmpresaRequestDto dto) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        empresa.atualizar(dto);
        return empresaRepository.save(empresa).toDto();
    }

    public void deletar(Long id) {
        empresaRepository.deleteById(id);
    }
}