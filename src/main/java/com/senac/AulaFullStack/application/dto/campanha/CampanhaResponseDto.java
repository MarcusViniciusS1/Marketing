package com.senac.AulaFullStack.application.dto.campanha;
import com.senac.AulaFullStack.domain.entity.Campanha;
import java.math.BigDecimal;
import java.time.LocalDate;
public record CampanhaResponseDto(Long id, String nome, String objetivo, BigDecimal orcamento, LocalDate dataInicio, LocalDate dataFim, Campanha.StatusCampanha status, String canalNome, Long empresaId) {}