// src/main/java/com/senac/marketing/dto/empresa/EmpresaResponse.java
package com.senac.marketing.dto.empresa;

import lombok.Value;
import java.time.LocalDateTime;

/**
 * DTO para representar a resposta de uma empresa.
 */
@Value
public class EmpresaResponse {
    Long id;
    String nome;
    String cnpj;
    LocalDateTime dataCriacao;
}