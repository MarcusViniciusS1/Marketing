// src/main/java/com/senac/marketing/service/EmpresaService.java
package com.senac.marketing.service;

import com.senac.marketing.dto.empresa.EmpresaRequest;
import com.senac.marketing.dto.empresa.EmpresaResponse;
import com.senac.marketing.entity.Empresa;
import com.senac.marketing.exception.BusinessException;
import com.senac.marketing.repository.EmpresaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Serviço responsável pela lógica de negócio da entidade Empresa.
 */
@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    public EmpresaService(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    @Transactional
    public EmpresaResponse criarEmpresa(EmpresaRequest request) {
        empresaRepository.findByCnpj(request.getCnpj())
                .ifPresent(e -> {
                    throw new BusinessException("Já existe uma empresa com este CNPJ.", HttpStatus.CONFLICT);
                });

        Empresa novaEmpresa = new Empresa();
        novaEmpresa.setNome(request.getNome());
        novaEmpresa.setCnpj(request.getCnpj());

        Empresa empresaSalva = empresaRepository.save(novaEmpresa);
        return mapToResponse(empresaSalva);
    }

    @Transactional(readOnly = true)
    public List<EmpresaResponse> listarEmpresas() {
        return empresaRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EmpresaResponse buscarEmpresaPorId(Long id) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Empresa não encontrada com ID: " + id, HttpStatus.NOT_FOUND));
        return mapToResponse(empresa);
    }

    @Transactional
    public EmpresaResponse atualizarEmpresa(Long id, EmpresaRequest request) {
        Empresa empresaExistente = empresaRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Empresa não encontrada com ID: " + id, HttpStatus.NOT_FOUND));

        empresaExistente.setNome(request.getNome());
        empresaExistente.setCnpj(request.getCnpj());

        Empresa empresaSalva = empresaRepository.save(empresaExistente);
        return mapToResponse(empresaSalva);
    }

    @Transactional
    public void deletarEmpresa(Long id) {
        if (!empresaRepository.existsById(id)) {
            throw new BusinessException("Empresa não encontrada com ID: " + id, HttpStatus.NOT_FOUND);
        }
        empresaRepository.deleteById(id);
    }

    private EmpresaResponse mapToResponse(Empresa empresa) {
        return new EmpresaResponse(
                empresa.getId(),
                empresa.getNome(),
                empresa.getCnpj(),
                empresa.getDataCriacao()
        );
    }
}