// src/main/java/com/senac/marketing/service/DadosMarketingService.java
package com.senac.marketing.service;

import com.senac.marketing.dto.marketing.DadosMarketingRequest;
import com.senac.marketing.dto.marketing.DadosMarketingResponse;
import com.senac.marketing.entity.DadosMarketing;
import com.senac.marketing.entity.Usuario;
import com.senac.marketing.exception.BusinessException;
import com.senac.marketing.repository.DadosMarketingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Serviço responsável pela lógica de negócio relacionada aos registros de marketing.
 */
@Service
public class DadosMarketingService {

    private final DadosMarketingRepository dadosMarketingRepository;
    private final UsuarioService usuarioService;

    public DadosMarketingService(DadosMarketingRepository dadosMarketingRepository,
                                 UsuarioService usuarioService) {
        this.dadosMarketingRepository = dadosMarketingRepository;
        this.usuarioService = usuarioService;
    }

    @Transactional
    public DadosMarketingResponse criar(DadosMarketingRequest request, Authentication authentication) {
        Usuario usuario = usuarioService.getUsuarioFromAuthentication(authentication);

        DadosMarketing novoDado = new DadosMarketing();
        novoDado.setNomeCampanha(request.getNomeCampanha());
        novoDado.setDataInicio(request.getDataInicio());
        novoDado.setDataFim(request.getDataFim());
        novoDado.setCusto(request.getCusto());
        novoDado.setImpressoes(request.getImpressoes());
        novoDado.setClicks(request.getClicks());
        novoDado.setConversoes(request.getConversoes());

        // --- PONTO DA CORREÇÃO ---
        // Se houver um usuário, usa o empresaId dele.
        // Se não (desenvolvimento), usa um ID padrão (1L) para permitir o cadastro.
        if (usuario != null) {
            novoDado.setEmpresaId(usuario.getEmpresaId());
        } else {
            novoDado.setEmpresaId(1L); // ID da empresa padrão para ambiente de desenvolvimento
        }

        return mapToResponse(dadosMarketingRepository.save(novoDado));
    }

    @Transactional(readOnly = true)
    public List<DadosMarketingResponse> listarPorUsuario(Authentication authentication) {
        Usuario usuario = usuarioService.getUsuarioFromAuthentication(authentication);

        List<DadosMarketing> dados;
        if (usuario == null || usuarioService.isUsuarioAdmin(usuario)) {
            dados = dadosMarketingRepository.findAll();
        } else {
            dados = dadosMarketingRepository.findByEmpresaIdOrderByDataCriacaoDesc(usuario.getEmpresaId());
        }
        return dados.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DadosMarketingResponse buscarPorIdEUsuario(Long id, Authentication authentication) {
        DadosMarketing dados = dadosMarketingRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Registro de marketing não encontrado com ID: " + id, HttpStatus.NOT_FOUND));

        Usuario usuario = usuarioService.getUsuarioFromAuthentication(authentication);

        if (usuario != null && !usuarioService.isUsuarioAdmin(usuario) && !dados.getEmpresaId().equals(usuario.getEmpresaId())) {
            throw new BusinessException("Acesso negado. Você não tem permissão para acessar este recurso.", HttpStatus.FORBIDDEN);
        }

        return mapToResponse(dados);
    }

    @Transactional
    public DadosMarketingResponse atualizar(Long id, DadosMarketingRequest request, Authentication authentication) {
        DadosMarketing dadoExistente = dadosMarketingRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Registro de marketing não encontrado com ID: " + id, HttpStatus.NOT_FOUND));

        Usuario usuario = usuarioService.getUsuarioFromAuthentication(authentication);

        if (usuario != null && !usuarioService.isUsuarioAdmin(usuario) && !dadoExistente.getEmpresaId().equals(usuario.getEmpresaId())) {
            throw new BusinessException("Acesso negado. Você não tem permissão para acessar este recurso.", HttpStatus.FORBIDDEN);
        }

        dadoExistente.setNomeCampanha(request.getNomeCampanha());
        dadoExistente.setDataInicio(request.getDataInicio());
        dadoExistente.setDataFim(request.getDataFim());
        dadoExistente.setCusto(request.getCusto());
        dadoExistente.setImpressoes(request.getImpressoes());
        dadoExistente.setClicks(request.getClicks());
        dadoExistente.setConversoes(request.getConversoes());

        return mapToResponse(dadosMarketingRepository.save(dadoExistente));
    }

    @Transactional
    public void deletar(Long id, Authentication authentication) {
        DadosMarketing dados = dadosMarketingRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Registro de marketing não encontrado com ID: " + id, HttpStatus.NOT_FOUND));

        Usuario usuario = usuarioService.getUsuarioFromAuthentication(authentication);

        if (usuario != null && !usuarioService.isUsuarioAdmin(usuario) && !dados.getEmpresaId().equals(usuario.getEmpresaId())) {
            throw new BusinessException("Acesso negado. Você não tem permissão para deletar este recurso.", HttpStatus.FORBIDDEN);
        }

        dadosMarketingRepository.delete(dados);
    }

    private DadosMarketingResponse mapToResponse(DadosMarketing dado) {
        return new DadosMarketingResponse(
                dado.getId(),
                dado.getNomeCampanha(),
                dado.getDataInicio(),
                dado.getDataFim(),
                dado.getCusto(),
                dado.getImpressoes(),
                dado.getClicks(),
                dado.getConversoes(),
                dado.getEmpresaId(),
                dado.getDataCriacao()
        );
    }
}