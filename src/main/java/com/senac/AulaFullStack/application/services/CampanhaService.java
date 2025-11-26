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

    public List<CampanhaResponseDto> listarMinhasCampanhas(UsuarioPrincipalDto user) {
        Usuario usuario = usuarioRepository.findById(user.id()).orElseThrow();
        if (usuario.getEmpresa() == null) return List.of();

        return campanhaRepository.findByEmpresaId(usuario.getEmpresa().getId())
                .stream().map(Campanha::toDto).collect(Collectors.toList());
    }

    public CampanhaResponseDto buscarPorId(Long id) {
        return campanhaRepository.findById(id).map(Campanha::toDto).orElse(null);
    }

    @Transactional
    public CampanhaResponseDto criar(CampanhaRequestDto dto, UsuarioPrincipalDto user) {
        Usuario usuario = usuarioRepository.findById(user.id()).orElseThrow();
        if (usuario.getEmpresa() == null) throw new RuntimeException("Usuário não tem empresa vinculada");

        Canal canal = canalRepository.findById(dto.canalId())
                .orElseThrow(() -> new RuntimeException("Canal não encontrado"));

        Campanha campanha = new Campanha(dto, canal, usuario.getEmpresa());
        campanhaRepository.save(campanha);
        return campanha.toDto();
    }

    @Transactional
    public CampanhaResponseDto atualizar(Long id, CampanhaRequestDto dto) {
        Campanha campanha = campanhaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campanha não encontrada"));

        // Atualizar campos
        campanha.setNome(dto.nome());
        campanha.setObjetivo(dto.objetivo());
        campanha.setOrcamento(dto.orcamento());
        campanha.setDataInicio(dto.dataInicio());
        campanha.setDataFim(dto.dataFim());

        // Atualiza Canal se mudou
        if(!campanha.getCanal().getId().equals(dto.canalId())) {
            Canal novoCanal = canalRepository.findById(dto.canalId()).orElseThrow();
            campanha.setCanal(novoCanal);
        }

        return campanhaRepository.save(campanha).toDto();
    }

    public void deletar(Long id) {
        campanhaRepository.deleteById(id);
    }
}