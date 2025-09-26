// src/main/java/com/senac/marketing/controller/MarketingController.java
package com.senac.marketing.controller;

import com.senac.marketing.dto.marketing.DadosMarketingRequest;
import com.senac.marketing.dto.marketing.DadosMarketingResponse;
import com.senac.marketing.service.DadosMarketingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gerenciar os dados de marketing (campanhas, métricas, etc.).
 */
@RestController
@RequestMapping("/api/marketing")
public class MarketingController {

    private final DadosMarketingService dadosMarketingService;

    public MarketingController(DadosMarketingService dadosMarketingService) {
        this.dadosMarketingService = dadosMarketingService;
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USUARIO_EMPRESA')")
    public ResponseEntity<DadosMarketingResponse> criarDadosMarketing(
            @Valid @RequestBody DadosMarketingRequest request,
            Authentication authentication) {
        DadosMarketingResponse novoDado = dadosMarketingService.criar(request, authentication);
        return new ResponseEntity<>(novoDado, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USUARIO_EMPRESA')")
    public ResponseEntity<List<DadosMarketingResponse>> listarDadosMarketing(Authentication authentication) {
        List<DadosMarketingResponse> dados = dadosMarketingService.listarPorUsuario(authentication);
        return ResponseEntity.ok(dados);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USUARIO_EMPRESA')")
    public ResponseEntity<DadosMarketingResponse> buscarPorId(@PathVariable Long id, Authentication authentication) {
        DadosMarketingResponse dados = dadosMarketingService.buscarPorIdEUsuario(id, authentication);
        return ResponseEntity.ok(dados);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USUARIO_EMPRESA')")
    public ResponseEntity<DadosMarketingResponse> atualizarDadosMarketing(
            @PathVariable Long id,
            @Valid @RequestBody DadosMarketingRequest request,
            Authentication authentication) {
        DadosMarketingResponse dadosAtualizados = dadosMarketingService.atualizar(id, request, authentication);
        return ResponseEntity.ok(dadosAtualizados);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USUARIO_EMPRESA')")
    public ResponseEntity<Void> deletarDadosMarketing(
            @PathVariable Long id,
            Authentication authentication) {
        dadosMarketingService.deletar(id, authentication);
        return ResponseEntity.noContent().build();
    }
}