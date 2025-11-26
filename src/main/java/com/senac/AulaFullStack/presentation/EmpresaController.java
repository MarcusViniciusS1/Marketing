package com.senac.AulaFullStack.presentation;

import com.senac.AulaFullStack.application.dto.empresa.EmpresaRequestDto;
import com.senac.AulaFullStack.application.dto.empresa.EmpresaResponseDto;
import com.senac.AulaFullStack.application.dto.usuario.UsuarioPrincipalDto;
import com.senac.AulaFullStack.application.services.EmpresaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresas")
@Tag(name = "Gestão de Empresas", description = "Gerenciamento corporativo")
public class EmpresaController {

    @Autowired private EmpresaService empresaService;

    // --- Rotas do Usuário Comum ---
    @GetMapping("/minha")
    @Operation(summary = "Dados da minha empresa")
    public ResponseEntity<EmpresaResponseDto> buscarMinhaEmpresa(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        EmpresaResponseDto dto = empresaService.buscarPorUsuario(user);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
    }

    @PostMapping("/cadastrar") // Ajustado para diferenciar
    @Operation(summary = "Cadastrar nova empresa (Self-service)")
    public ResponseEntity<EmpresaResponseDto> cadastrar(@RequestBody EmpresaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(empresaService.cadastrar(dto, user));
    }

    @PutMapping("/minha")
    @Operation(summary = "Atualizar dados da minha empresa")
    public ResponseEntity<EmpresaResponseDto> atualizar(@RequestBody EmpresaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(empresaService.atualizar(dto, user));
    }

    // --- Rotas de ADMIN (CRUD Completo) ---

    @GetMapping
    @Operation(summary = "Listar todas as empresas (Admin)")
    public ResponseEntity<List<EmpresaResponseDto>> listarTodas() {
        return ResponseEntity.ok(empresaService.listarTodas());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar empresa por ID (Admin)")
    public ResponseEntity<EmpresaResponseDto> buscarPorId(@PathVariable Long id) {
        EmpresaResponseDto dto = empresaService.buscarPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar empresa por ID (Admin)")
    public ResponseEntity<EmpresaResponseDto> atualizarPorId(@PathVariable Long id, @RequestBody EmpresaRequestDto dto) {
        return ResponseEntity.ok(empresaService.atualizarPorId(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar empresa (Admin)")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        empresaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}