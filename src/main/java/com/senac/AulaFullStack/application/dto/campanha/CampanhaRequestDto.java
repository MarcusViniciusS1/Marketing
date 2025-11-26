package com.senac.AulaFullStack.application.dto.campanha;
import java.math.BigDecimal;
import java.time.LocalDate;
public record CampanhaRequestDto(String nome, String objetivo, BigDecimal orcamento, LocalDate dataInicio, LocalDate dataFim, Long canalId) {}