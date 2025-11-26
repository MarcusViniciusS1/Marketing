package com.senac.AulaFullStack.presentation;

import com.senac.AulaFullStack.application.dto.usuario.*;
import com.senac.AulaFullStack.application.services.UsuarioService;
import com.senac.AulaFullStack.domain.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/usuarios")
@Tag(name="Controlador de usuários",description = "Camada responsável por controlar os registros")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDto> consultaPorId(@PathVariable Long id){
        var usuario = usuarioService.consultarPorId(id);
        if (usuario == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario);
    }

    @GetMapping
    @Operation( summary = "Listar TODOS os usuários (Admin Geral)")
    public ResponseEntity<List<UsuarioResponseDto>> consultarTodos(){
        return ResponseEntity.ok(usuarioService.consultarTodosSemFiltro());
    }

    // --- NOVO ENDPOINT PARA CORRIGIR O ERRO 403 ---
    @GetMapping("/minha-empresa")
    @Operation(summary = "Listar equipe da minha empresa")
    public ResponseEntity<List<UsuarioResponseDto>> listarPorEmpresa(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(usuarioService.listarPorEmpresa(user));
    }

    @PostMapping
    public ResponseEntity<?> cadastrarUsuario(@RequestBody UsuarioRequestDto usuario){
        try{
            var usuarioResponse = usuarioService.salvarUsuario(usuario);
            return ResponseEntity.ok(usuarioResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/grid")
    public ResponseEntity<List<UsuarioResponseDto>> consultarPaginadoFiltrado(
            @RequestParam long take,
            @RequestParam Long page,
            @RequestParam(required = false) String filtro){
        return ResponseEntity.ok(usuarioService.consultarPaginadoFiltrado(take,page,filtro));
    }

    @PutMapping("/editar")
    public ResponseEntity<UsuarioResponseDto> editarUser(
            @RequestBody UsuarioRequestEdicao usuarioRequest,
            @AuthenticationPrincipal UsuarioPrincipalDto usuarioPrincipalDto) {
        UsuarioResponseDto usuarioResponse =
                usuarioService.editarUsuario(usuarioRequest, usuarioPrincipalDto);
        return ResponseEntity.ok(usuarioResponse);
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponseDto> buscarUsuarioLogado(
            @AuthenticationPrincipal UsuarioPrincipalDto usuarioPrincipalDto) {
        var usuario = usuarioService.buscarUsuarioLogado(usuarioPrincipalDto);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/vincularEmpresa")
    public ResponseEntity<UsuarioResponseDto> vincularEmpresa(
            @RequestParam Long empresaId,
            @AuthenticationPrincipal UsuarioPrincipalDto usuarioPrincipalDto) {
        var usuarioLogado = usuarioRepository.findById(usuarioPrincipalDto.id())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        UsuarioResponseDto response = usuarioService.vincularUsuarioComEmpresa(empresaId, usuarioLogado);
        return ResponseEntity.ok(response);
    }
}