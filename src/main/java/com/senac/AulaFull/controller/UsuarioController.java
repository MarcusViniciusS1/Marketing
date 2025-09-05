package com.senac.AulaFull.controller;

import com.senac.AulaFull.model.Usuario;
import com.senac.AulaFull.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuários", description = "Controle de login e cadastro de usuários")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/registrar")
    @Operation(summary = "Registrar um novo usuário")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario){
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @PostMapping("/login")
    @Operation(summary = "Login de usuário")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String senha){
        Optional<Usuario> usuario = usuarioRepository.findByEmailAndSenha(email, senha);

        if(usuario.isPresent()){
            return ResponseEntity.ok("Login realizado com sucesso!");
        } else {
            return ResponseEntity.status(401).body("Usuário ou senha inválidos.");
        }
    }
}
