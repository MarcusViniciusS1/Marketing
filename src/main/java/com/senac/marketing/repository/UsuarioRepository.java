// src/main/java/com/senac/marketing/repository/UsuarioRepository.java
package com.senac.marketing.repository;

import com.senac.marketing.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Interface de Repositório para a entidade {@link Usuario}.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}