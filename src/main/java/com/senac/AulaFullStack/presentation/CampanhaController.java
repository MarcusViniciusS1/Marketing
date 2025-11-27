package com.senac.AulaFullStack.presentation;

import com.senac.AulaFullStack.application.dto.campanha.CampanhaRequestDto;
import com.senac.AulaFullStack.application.dto.campanha.CampanhaResponseDto;
import com.senac.AulaFullStack.application.dto.usuario.UsuarioPrincipalDto;
import com.senac.AulaFullStack.application.services.CampanhaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/campanhas")
@Tag(name = "Gestão de Campanhas", description = "CRUD de Campanhas")
public class CampanhaController {

    @Autowired private CampanhaService campanhaService;

    @GetMapping
    public ResponseEntity<List<CampanhaResponseDto>> listar(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(campanhaService.listar(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampanhaResponseDto> buscarPorId(@PathVariable Long id, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(campanhaService.buscarPorId(id, user));
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody CampanhaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        try {
            return ResponseEntity.ok(campanhaService.criar(dto, user));
        } catch (Exception e) {
            e.printStackTrace(); // Ver erro no console do backend
            return ResponseEntity.badRequest().body("Erro ao criar campanha: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody CampanhaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        try {
            return ResponseEntity.ok(campanhaService.atualizar(id, dto, user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        campanhaService.deletar(id, user);
        return ResponseEntity.noContent().build();
    }
}