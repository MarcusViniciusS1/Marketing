package com.senac.AulaFullStack.application.services;

import com.senac.AulaFullStack.application.dto.campanha.*;
import com.senac.AulaFullStack.application.dto.usuario.UsuarioPrincipalDto;
import com.senac.AulaFullStack.domain.entity.*;
import com.senac.AulaFullStack.domain.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CampanhaService {

    @Autowired private CampanhaRepository campanhaRepository;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private CanalRepository canalRepository;

    public List<CampanhaResponseDto> listar(UsuarioPrincipalDto user) {
        Usuario usuario = usuarioRepository.findById(user.id()).orElseThrow();

        // Se for ADMIN, vê tudo
        if ("ADMIN".equals(usuario.getRole())) {
            return campanhaRepository.findAll().stream().map(Campanha::toDto).collect(Collectors.toList());
        }

        // Se for User/Gerente sem empresa, retorna vazio
        if (usuario.getEmpresa() == null) return List.of();

        return campanhaRepository.findByEmpresaId(usuario.getEmpresa().getId())
                .stream().map(Campanha::toDto).collect(Collectors.toList());
    }

    public CampanhaResponseDto buscarPorId(Long id, UsuarioPrincipalDto user) {
        return campanhaRepository.findById(id).map(Campanha::toDto).orElse(null);
    }

    @Transactional
    public CampanhaResponseDto criar(CampanhaRequestDto dto, UsuarioPrincipalDto userDto) {
        Usuario usuario = usuarioRepository.findById(userDto.id()).orElseThrow();

        // Validação: Apenas quem tem empresa pode criar campanha (Para manter a consistência)
        // Se for ADMIN e quiser testar, vincule o admin a uma empresa primeiro.
        if (usuario.getEmpresa() == null) {
            throw new RuntimeException("Para criar uma campanha, o usuário deve estar vinculado a uma empresa.");
        }

        Canal canal = canalRepository.findById(dto.canalId())
                .orElseThrow(() -> new RuntimeException("Canal inválido."));

        Campanha campanha = new Campanha(dto, canal, usuario.getEmpresa());
        campanhaRepository.save(campanha);

        return campanha.toDto();
    }

    @Transactional
    public CampanhaResponseDto atualizar(Long id, CampanhaRequestDto dto, UsuarioPrincipalDto userDto) {
        Campanha campanha = campanhaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campanha não encontrada."));

        campanha.setNome(dto.nome());
        campanha.setObjetivo(dto.objetivo());
        campanha.setOrcamento(dto.orcamento());
        campanha.setDataInicio(dto.dataInicio());
        campanha.setDataFim(dto.dataFim());

        if (!campanha.getCanal().getId().equals(dto.canalId())) {
            campanha.setCanal(canalRepository.findById(dto.canalId()).orElseThrow());
        }
        return campanhaRepository.save(campanha).toDto();
    }

    public void deletar(Long id, UsuarioPrincipalDto userDto) {
        campanhaRepository.deleteById(id);
    }

    // Método sobrecarregado caso o controller chame sem usuario (Admin direto)
    public void deletar(Long id) {
        campanhaRepository.deleteById(id);
    }
}