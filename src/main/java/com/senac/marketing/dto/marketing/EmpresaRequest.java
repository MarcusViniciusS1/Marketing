// src/main/java/com/senac/marketing/dto/empresa/EmpresaRequest.java
package com.senac.marketing.dto.empresa;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Value;

/**
 * DTO para representar a requisição de criação ou atualização de uma empresa.
 */
@Value
public class EmpresaRequest {

    @NotBlank(message = "O nome da empresa não pode estar em branco")
    @Size(min = 3, max = 100, message = "O nome da empresa deve ter entre 3 e 100 caracteres")
    String nome;

    @NotBlank(message = "O CNPJ da empresa não pode estar em branco")
    @Size(min = 14, max = 14, message = "O CNPJ deve ter 14 caracteres")
    String cnpj;
}