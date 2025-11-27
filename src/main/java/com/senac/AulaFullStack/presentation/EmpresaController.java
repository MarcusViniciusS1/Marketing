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
@Tag(name = "Gestão de Empresas", description = "Gerenciamento Unificado")
public class EmpresaController {

    @Autowired private EmpresaService empresaService;

    @GetMapping
    @Operation(summary = "Listar empresas (Regra inteligente por perfil)")
    public ResponseEntity<List<EmpresaResponseDto>> listar(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(empresaService.listar(user));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody EmpresaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        try {
            return ResponseEntity.ok(empresaService.cadastrar(dto, user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaResponseDto> buscarPorId(@PathVariable Long id) {
        EmpresaResponseDto dto = empresaService.buscarPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaResponseDto> atualizar(@PathVariable Long id, @RequestBody EmpresaRequestDto dto) {
        return ResponseEntity.ok(empresaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        empresaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}