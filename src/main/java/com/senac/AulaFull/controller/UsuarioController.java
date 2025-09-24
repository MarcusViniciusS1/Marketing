package com.senac.AulaFull.controller;

import com.senac.AulaFull.model.Usuario;
import com.senac.AulaFull.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Controlador de usuários", description = "Camada responsável por controlar os registros de usuários")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/{id}")
    public ResponseEntity<?> consultaPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        if (usuario.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(usuario.get());
    }

    @GetMapping
    @Operation(summary = "Listar todos", description = "Método responsável por consultar todos os usuários do sistema")
    public ResponseEntity<?> consultarTodos() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @PostMapping
    @Operation(summary = "Salvar Usuário", description = "Método responsável por criar usuários no sistema")
    public ResponseEntity<?> salvarUsuario(@RequestBody Usuario usuario) {
        try {
            // Criptografa a senha antes de salvar
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

            Usuario usuarioResponse = usuarioRepository.save(usuario);

            return ResponseEntity.ok(usuarioResponse);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar usuário: " + e.getMessage());
        }
    }
}
