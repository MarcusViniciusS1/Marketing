package com.senac.AulaFullStack.presentation;

import com.senac.AulaFullStack.application.dto.canal.CanalResponseDto;
import com.senac.AulaFullStack.application.services.CanalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/canais")
@Tag(name = "Canais de Marketing", description = "Listagem de canais disponíveis (Google, Meta, etc)")
public class CanalController {

    @Autowired
    private CanalService canalService;

    @GetMapping
    @Operation(summary = "Listar todos os canais")
    public ResponseEntity<List<CanalResponseDto>> listarCanais() {
        return ResponseEntity.ok(canalService.listarTodos());
    }
}