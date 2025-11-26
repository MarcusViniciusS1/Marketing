package com.senac.AulaFullStack.domain.repository;

import com.senac.AulaFullStack.domain.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
}