package com.senac.aulafull.controller;

import com.senac.aulafull.model.Usuario;
import com.senac.aulafull.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Contralador de usuários", description = "Camada responsável por controlar os registros de usuários")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> consultaPorId(@PathVariable Long id) {

        var usuario = usuarioRepository.findById(id).
                orElse(null);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(usuario);
    }

    @GetMapping
    @Operation(summary = "email", description = "Método responsável por consultar os usuários do sistema")
    public ResponseEntity<?> consultarTodos() {

        return ResponseEntity.ok(usuarioRepository.findAll());

    }


    @PostMapping
    @Operation(summary = "Salvar Usuário", description = "Método responsável por criar os usuários do sistema")
    public ResponseEntity<?> salvarUsuario(@RequestBody Usuario usuario) {
        try {

            var usuarioResponse = usuarioRepository.save(usuario);

            return ResponseEntity.ok(usuarioResponse);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
