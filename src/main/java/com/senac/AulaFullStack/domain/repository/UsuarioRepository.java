package com.senac.AulaFullStack.domain.repository;


import com.senac.AulaFullStack.domain.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmailAndNome(String email, String nome);
    boolean existsUsuarioByEmailContainingAndSenha(String email, String senha);

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByCpf(String cpf);

    Optional<Usuario> findByEmailAndTokenSenha(String email, String tokenSenha);

    List<Usuario> findByRole(String role);



}
