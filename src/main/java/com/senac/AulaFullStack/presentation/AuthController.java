package com.senac.AulaFullStack.presentation;


import com.senac.AulaFullStack.application.dto.login.LoginRequestDto;
import com.senac.AulaFullStack.application.dto.login.LoginResponseDto;
import com.senac.AulaFullStack.application.dto.login.RecuperarSenhaDto;
import com.senac.AulaFullStack.application.dto.usuario.RegistrarNovaSenhaDto;
import com.senac.AulaFullStack.application.dto.usuario.UsuarioPrincipalDto;
import com.senac.AulaFullStack.application.services.TokenService;
import com.senac.AulaFullStack.application.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name= "Controladora de autenticação", description = "Controlar a autenticação de usuários")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Método responsável por efetuar o login de usuário")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
        if (!usuarioService.validarSenha(request)) {
            return ResponseEntity.badRequest().build(); // remover String pra manter padrão de não retornar nada que não seja DTO
        }

        var token = tokenService.gerarToken(request);
        return ResponseEntity.ok(new LoginResponseDto(token));
    }



//    @GetMapping("/recuperarsenha/envio")
//    @Operation(summary = "Recuperar senha",description = "Método de recuperar senha")
//    public ResponseEntity<?> recuperarSenhaEnvio(@AuthenticationPrincipal UsuarioPrincipalDto usuarioLogado){
//
//        usuarioService.recuperarSenhaEnvio(usuarioLogado);
//        return ResponseEntity.ok("Código enviado com sucesso!");
//
//    }

    @PostMapping("/esquecisenha")
    @Operation(summary = "Esqueci minha senha", description = "Método para recuperar senha Uusuário")
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

