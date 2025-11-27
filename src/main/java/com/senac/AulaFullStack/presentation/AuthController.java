package com.senac.AulaFullStack.presentation;

import com.senac.AulaFullStack.application.dto.login.LoginRequestDto;
import com.senac.AulaFullStack.application.dto.login.LoginResponseDto;
import com.senac.AulaFullStack.application.dto.login.RecuperarSenhaDto;
import com.senac.AulaFullStack.application.dto.usuario.RegistrarNovaSenhaDto;
import com.senac.AulaFullStack.application.services.TokenService;
import com.senac.AulaFullStack.application.services.UsuarioService;
import com.senac.AulaFullStack.domain.repository.UsuarioRepository; // Import necessário
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name= "Controladora de autenticação", description = "Controlar a autenticação de usuários")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository; // Injeção do repositório

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Método responsável por efetuar o login de usuário e retornar token com informações")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
        if (!usuarioService.validarSenha(request)) {
            return ResponseEntity.badRequest().build();
        }

        var token = tokenService.gerarToken(request);
        // Busca o usuário para extrair as informações adicionais
        var usuario = usuarioRepository.findByEmail(request.email()).orElseThrow();

        // Retorna o DTO completo com token, role, empresaId e nome
        return ResponseEntity.ok(new LoginResponseDto(
                token,
                usuario.getRole(),
                usuario.getEmpresa() != null ? usuario.getEmpresa().getId() : null,
                usuario.getNome()
        ));
    }

    @PostMapping("/esquecisenha")
    @Operation(summary = "Esqueci minha senha", description = "Método para recuperar senha Usuário")
    public ResponseEntity<Void> recuperarSenha(@RequestBody RecuperarSenhaDto recuperarSenhaDto){
        try {
            usuarioService.recuperarSenha(recuperarSenhaDto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/registrarnovasenha")
    @Operation(summary = "Registrar nova senha", description = "Método para registrar a nova senha")
    public ResponseEntity<Void> registrarNovaSenha(@RequestBody RegistrarNovaSenhaDto registrarNovaSenhaDto){
        try {
            usuarioService.registrarNovaSenha(registrarNovaSenhaDto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}