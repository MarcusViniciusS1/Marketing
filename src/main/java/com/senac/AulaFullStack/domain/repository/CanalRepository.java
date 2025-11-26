package com.senac.AulaFullStack.domain.repository;

import com.senac.AulaFullStack.domain.entity.Canal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanalRepository extends JpaRepository<Canal, Long> {
}