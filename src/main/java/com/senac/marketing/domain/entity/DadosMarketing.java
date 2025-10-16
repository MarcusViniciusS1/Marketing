// src/main/java/com/senac/marketing/entity/DadosMarketing.java
package com.senac.marketing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entidade que representa um registro de dados de marketing (ex: uma campanha).
 */
@Entity
@Table(name = "dados_marketing")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DadosMarketing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_campanha", nullable = false)
    private String nomeCampanha;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "data_fim", nullable = false)
    private LocalDate dataFim;

    @Column(nullable = false)
    private Double custo;

    @Column(nullable = false)
    private Integer impressoes;

    @Column(nullable = false)
    private Integer clicks;

    @Column(nullable = false)
    private Integer conversoes;

    @Column(name = "empresa_id", nullable = false)
    private Long empresaId;

    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @PrePersist
    public void prePersist() {
        if (this.dataCriacao == null) {
            this.dataCriacao = LocalDateTime.now();
        }
    }
}