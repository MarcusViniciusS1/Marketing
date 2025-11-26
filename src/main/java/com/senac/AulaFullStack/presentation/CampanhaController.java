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
@Tag(name = "Gestão de Campanhas", description = "CRUD de Campanhas de Marketing")
public class CampanhaController {

    @Autowired private CampanhaService campanhaService;

    @GetMapping
    @Operation(summary = "Listar todas as campanhas da empresa")
    public ResponseEntity<List<CampanhaResponseDto>> listar(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(campanhaService.listarMinhasCampanhas(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampanhaResponseDto> buscarPorId(@PathVariable Long id) {
        CampanhaResponseDto dto = campanhaService.buscarPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<CampanhaResponseDto> criar(@RequestBody CampanhaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(campanhaService.criar(dto, user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampanhaResponseDto> atualizar(@PathVariable Long id, @RequestBody CampanhaRequestDto dto) {
        return ResponseEntity.ok(campanhaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        campanhaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}