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

    // --- LISTAGEM GERAL (Usa lógica do Service para filtrar e SecurityConfig restringe acesso) ---
    @GetMapping
    public ResponseEntity<List<EmpresaResponseDto>> listar(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(empresaService.listar(user));
    }

    // --- DADOS DA MINHA EMPRESA ---
    @GetMapping("/minha")
    public ResponseEntity<EmpresaResponseDto> buscarMinhaEmpresa(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        EmpresaResponseDto dto = empresaService.buscarPorUsuario(user);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
    }

    @PutMapping("/minha")
    public ResponseEntity<EmpresaResponseDto> atualizarMinha(@RequestBody EmpresaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(empresaService.atualizar(dto, user));
    }

    // --- CADASTRO ---
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody EmpresaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        try {
            return ResponseEntity.ok(empresaService.cadastrar(dto, user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao cadastrar: " + e.getMessage());
        }
    }

    // --- ADMINISTRAÇÃO POR ID ---
    @GetMapping("/{id}")
    public ResponseEntity<EmpresaResponseDto> buscarPorId(@PathVariable Long id) {
        EmpresaResponseDto dto = empresaService.buscarPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaResponseDto> atualizarPorId(@PathVariable Long id, @RequestBody EmpresaRequestDto dto) {
        return ResponseEntity.ok(empresaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        empresaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}