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
    @Operation(summary = "Consultar Usuário por ID")
    public ResponseEntity<UsuarioResponseDto> consultaPorId(@PathVariable Long id){
        var usuario = usuarioService.consultarPorId(id);
        if (usuario == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario);
    }

    @GetMapping
    @Operation( summary = "Consultar usuários", description = "Método responsável por consultar todos os usuários")
    public ResponseEntity<List<UsuarioResponseDto>> consultarTodos(){
        return ResponseEntity.ok(usuarioService.consultarTodosSemFiltro());
    }

    @PostMapping
    @Operation(summary = "Cadastrar usuário", description = "Método responsável por cadastrar usuários")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody UsuarioRequestDto usuario){
        try{
            var usuarioResponse = usuarioService.salvarUsuario(usuario);
            return ResponseEntity.ok(usuarioResponse);
        } catch (Exception e) {
            // Retorna o erro específico (ex: "Email já cadastrado") para o front
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/grid")
    @Operation(summary = "Usuários Grid filtrada")
    public ResponseEntity<List<UsuarioResponseDto>> consultarPaginadoFiltrado(
            @Parameter(description = "Parametro de quantidade de registro por página")
            @RequestParam long take,
            @Parameter(description = "Parametro de quantidade de páginas")
            @RequestParam Long page,
            @Parameter(description = "Parametro de filtro") @RequestParam(required = false) String filtro){
        return ResponseEntity.ok(usuarioService.consultarPaginadoFiltrado(take,page,filtro));
    }

    @PutMapping("/editar")
    @Operation(summary = "Editar usuário logado", description = "Método responsável por editar o usuário logado")
    public ResponseEntity<UsuarioResponseDto> editarUser(
            @RequestBody UsuarioRequestEdicao usuarioRequest,
            @AuthenticationPrincipal UsuarioPrincipalDto usuarioPrincipalDto) {

        UsuarioResponseDto usuarioResponse =
                usuarioService.editarUsuario(usuarioRequest, usuarioPrincipalDto);

        return ResponseEntity.ok(usuarioResponse);
    }

    @GetMapping("/me")
    @Operation(summary = "Buscar dados do usuário logado", description = "Método responsável por buscar dados do usuário logado")
    public ResponseEntity<UsuarioResponseDto> buscarUsuarioLogado(
            @AuthenticationPrincipal UsuarioPrincipalDto usuarioPrincipalDto) {

        var usuario = usuarioService.buscarUsuarioLogado(usuarioPrincipalDto);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/vincularEmpresa")
    @Operation(summary = "Vincular usuário a empresa", description = "Método responsável por vincular o usuário a uma empresa")
    public ResponseEntity<UsuarioResponseDto> vincularEmpresa(
            @RequestParam Long empresaId,
            @AuthenticationPrincipal UsuarioPrincipalDto usuarioPrincipalDto) {

        var usuarioLogado = usuarioRepository.findById(usuarioPrincipalDto.id())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        UsuarioResponseDto response = usuarioService.vincularUsuarioComEmpresa(empresaId, usuarioLogado);
        return ResponseEntity.ok(response);
    }
}