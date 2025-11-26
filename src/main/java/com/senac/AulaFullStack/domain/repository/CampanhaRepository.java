package com.senac.AulaFullStack.domain.repository;
import com.senac.AulaFullStack.domain.entity.Campanha;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CampanhaRepository extends JpaRepository<Campanha, Long> {
    List<Campanha> findByEmpresaId(Long empresaId);
}