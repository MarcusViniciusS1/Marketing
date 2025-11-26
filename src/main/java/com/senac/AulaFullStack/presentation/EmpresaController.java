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

@RestController
@RequestMapping("/empresas")
@Tag(name = "Gestão de Empresas", description = "Gerenciamento do perfil corporativo")
public class EmpresaController {

    @Autowired private EmpresaService empresaService;

    @GetMapping("/minha")
    @Operation(summary = "Dados da minha empresa")
    public ResponseEntity<EmpresaResponseDto> buscarMinhaEmpresa(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        EmpresaResponseDto dto = empresaService.buscarPorUsuario(user);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.noContent().build();
    }

    @PostMapping
    @Operation(summary = "Cadastrar nova empresa")
    public ResponseEntity<EmpresaResponseDto> cadastrar(@RequestBody EmpresaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(empresaService.cadastrar(dto, user));
    }

    @PutMapping("/minha")
    @Operation(summary = "Atualizar dados da empresa")
    public ResponseEntity<EmpresaResponseDto> atualizar(@RequestBody EmpresaRequestDto dto, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(empresaService.atualizar(dto, user));
    }
}