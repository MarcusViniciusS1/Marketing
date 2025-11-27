package com.senac.AulaFullStack.presentation;

import com.senac.AulaFullStack.application.dto.usuario.*;
import com.senac.AulaFullStack.application.services.UsuarioService;
import com.senac.AulaFullStack.domain.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name="Controlador de usuários", description = "Gestão de Usuários")
public class UsuarioController {

    @Autowired private UsuarioService usuarioService;
    @Autowired private UsuarioRepository usuarioRepository;

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDto> consultaPorId(@PathVariable Long id){
        var usuario = usuarioService.consultarPorId(id);
        return usuario != null ? ResponseEntity.ok(usuario) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDto>> consultarTodos(){
        return ResponseEntity.ok(usuarioService.consultarTodosSemFiltro());
    }

    @GetMapping("/minha-empresa")
    public ResponseEntity<List<UsuarioResponseDto>> listarPorEmpresa(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(usuarioService.listarPorEmpresa(user));
    }

    @PostMapping
    public ResponseEntity<?> cadastrarUsuario(@RequestBody UsuarioRequestDto usuario){
        try{
            return ResponseEntity.ok(usuarioService.salvarUsuario(usuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/editar")
    public ResponseEntity<UsuarioResponseDto> editarUser(
            @RequestBody UsuarioRequestEdicao req,
            @AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(usuarioService.editarUsuario(req, user));
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponseDto> buscarMe(@AuthenticationPrincipal UsuarioPrincipalDto user) {
        return ResponseEntity.ok(usuarioService.buscarUsuarioLogado(user));
    }

    @PostMapping("/vincularEmpresa")
    public ResponseEntity<UsuarioResponseDto> vincular(@RequestParam Long empresaId, @AuthenticationPrincipal UsuarioPrincipalDto user) {
        var logado = usuarioRepository.findById(user.id()).orElseThrow();
        return ResponseEntity.ok(usuarioService.vincularUsuarioComEmpresa(empresaId, logado));
    }

    // --- ROTA DE DELETE ---
    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir usuário")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}