// src/main/java/com/senac/marketing/controller/EmpresaController.java
package com.senac.marketing.controller;

import com.senac.marketing.dto.empresa.EmpresaRequest;
import com.senac.marketing.dto.empresa.EmpresaResponse;
import com.senac.marketing.service.EmpresaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gerenciar empresas. Acesso restrito ao ADMIN.
 */
@RestController
@RequestMapping("/api/empresas")
@PreAuthorize("hasAuthority('ADMIN')")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @PostMapping
    public ResponseEntity<EmpresaResponse> criarEmpresa(@Valid @RequestBody EmpresaRequest request) {
        EmpresaResponse novaEmpresa = empresaService.criarEmpresa(request);
        return new ResponseEntity<>(novaEmpresa, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EmpresaResponse>> listarEmpresas() {
        List<EmpresaResponse> empresas = empresaService.listarEmpresas();
        return ResponseEntity.ok(empresas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaResponse> buscarPorId(@PathVariable Long id) {
        EmpresaResponse empresa = empresaService.buscarEmpresaPorId(id);
        return ResponseEntity.ok(empresa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaResponse> atualizarEmpresa(@PathVariable Long id, @Valid @RequestBody EmpresaRequest request) {
        EmpresaResponse empresaAtualizada = empresaService.atualizarEmpresa(id, request);
        return ResponseEntity.ok(empresaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEmpresa(@PathVariable Long id) {
        empresaService.deletarEmpresa(id);
        return ResponseEntity.noContent().build();
    }
}