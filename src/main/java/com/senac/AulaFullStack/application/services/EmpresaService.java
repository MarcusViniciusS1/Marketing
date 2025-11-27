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

    // --- MÉTODO UNIFICADO ---
    public List<EmpresaResponseDto> listar(UsuarioPrincipalDto principal) {
        // Verifica se é ADMIN (Super Usuário)
        boolean isAdmin = principal.autorizacao().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            // Admin vê TODAS
            return empresaRepository.findAll().stream()
                    .map(Empresa::toDto)
                    .collect(Collectors.toList());
        } else {
            // Outros (Gerentes) veem apenas a SUA
            Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();
            if (usuario.getEmpresa() != null) {
                return List.of(usuario.getEmpresa().toDto());
            }
            return List.of(); // Sem empresa vinculada
        }
    }

    public EmpresaResponseDto buscarPorId(Long id) {
        return empresaRepository.findById(id).map(Empresa::toDto).orElse(null);
    }

    @Transactional
    public EmpresaResponseDto cadastrar(EmpresaRequestDto dto, UsuarioPrincipalDto principal) {
        Usuario usuario = usuarioRepository.findById(principal.id()).orElseThrow();
        Empresa empresa = new Empresa(dto);
        empresaRepository.save(empresa);

        // Se quem cadastrou não tem empresa, vincula automaticamente (Autosserviço)
        if (usuario.getEmpresa() == null) {
            usuario.setEmpresa(empresa);
            usuarioRepository.save(usuario);
        }

        return empresa.toDto();
    }

    @Transactional
    public EmpresaResponseDto atualizar(Long id, EmpresaRequestDto dto) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        empresa.atualizar(dto);
        return empresaRepository.save(empresa).toDto();
    }

    public void deletar(Long id) {
        empresaRepository.deleteById(id);
    }
}