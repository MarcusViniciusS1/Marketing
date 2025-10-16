// src/main/java/com/senac/marketing/dto/marketing/DadosMarketingResponse.java
package com.senac.marketing.dto.marketing;

import lombok.Value;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO para representar a resposta do backend ao frontend com os
 * dados de um registro de marketing.
 */
@Value
public class DadosMarketingResponse {
    Long id;
    String nomeCampanha;
    LocalDate dataInicio;
    LocalDate dataFim;
    Double custo;
    Integer impressoes;
    Integer clicks;
    Integer conversoes;
    Long empresaId;
    LocalDateTime dataCriacao;
}