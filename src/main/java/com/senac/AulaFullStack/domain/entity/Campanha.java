package com.senac.AulaFullStack.domain.entity;

import com.senac.AulaFullStack.application.dto.campanha.CampanhaRequestDto;
import com.senac.AulaFullStack.application.dto.campanha.CampanhaResponseDto;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "campanha")
public class Campanha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String objetivo; // Substitui descricao
    private BigDecimal orcamento; // Novo campo
    private LocalDate dataInicio; // Novo campo
    private LocalDate dataFim;    // Novo campo
    private LocalDateTime dataCriacao;

    @Enumerated(EnumType.STRING)
    private StatusCampanha status;

    @ManyToOne
    @JoinColumn(name = "canal_id", nullable = false)
    private Canal canal; // Substitui especie

    @ManyToOne
    @JoinColumn(name="empresa_id")
    private Empresa empresa; // Substitui ong

    public enum StatusCampanha {
        PLANEJAMENTO, ATIVA, PAUSADA, CONCLUIDA, CANCELADA
    }

    public Campanha(CampanhaRequestDto dto, Canal canal, Empresa empresa) {
        this.nome = dto.nome();
        this.objetivo = dto.objetivo();
        this.orcamento = dto.orcamento();
        this.dataInicio = dto.dataInicio();
        this.dataFim = dto.dataFim();
        this.status = StatusCampanha.PLANEJAMENTO;
        this.dataCriacao = LocalDateTime.now();
        this.canal = canal;
        this.empresa = empresa;
    }

    public CampanhaResponseDto toDto(){
        return new CampanhaResponseDto(
                id, nome, objetivo, orcamento, dataInicio, dataFim, status,
                canal != null ? canal.getNome() : "Geral",
                empresa != null ? empresa.getId() : null
        );
    }
}