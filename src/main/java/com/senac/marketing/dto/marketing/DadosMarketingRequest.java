// src/main/java/com/senac/marketing/dto/marketing/DadosMarketingRequest.java
package com.senac.marketing.dto.marketing;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;
import java.time.LocalDate;

/**
 * DTO para representar os dados de requisição para criar ou atualizar um registro de marketing.
 * Inclui informações sobre a campanha, como nome, período e métricas de desempenho.
 */
@Value
public class DadosMarketingRequest {

    @NotBlank(message = "O nome da campanha não pode estar em branco")
    String nomeCampanha;

    @NotNull(message = "A data de início da campanha é obrigatória")
    LocalDate dataInicio;

    @NotNull(message = "A data de fim da campanha é obrigatória")
    LocalDate dataFim;

    @NotNull(message = "O custo da campanha é obrigatório")
    @Min(value = 0, message = "O custo deve ser um valor positivo")
    Double custo;

    @NotNull(message = "O número de impressões é obrigatório")
    @Min(value = 0, message = "O número de impressões não pode ser negativo")
    Integer impressoes;

    @NotNull(message = "O número de cliques é obrigatório")
    @Min(value = 0, message = "O número de cliques não pode ser negativo")
    Integer clicks;

    @NotNull(message = "O número de conversões é obrigatório")
    @Min(value = 0, message = "O número de conversões não pode ser negativo")
    Integer conversoes;
}