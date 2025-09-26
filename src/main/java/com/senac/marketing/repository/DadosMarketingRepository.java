// src/main/java/com/senac/marketing/repository/DadosMarketingRepository.java
package com.senac.marketing.repository;

import com.senac.marketing.entity.DadosMarketing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interface de Repositório para a entidade {@link DadosMarketing}.
 */
@Repository
public interface DadosMarketingRepository extends JpaRepository<DadosMarketing, Long> {

    /**
     * Busca todos os registros de dados de marketing de uma empresa.
     */
    List<DadosMarketing> findByEmpresaIdOrderByDataCriacaoDesc(Long empresaId);
}