// src/main/java/com/senac/marketing/repository/EmpresaRepository.java
package com.senac.marketing.repository;

import com.senac.marketing.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Interface de Repositório para a entidade {@link Empresa}.
 */
@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByCnpj(String cnpj);
}