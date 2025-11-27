package com.senac.AulaFullStack.application.dto.empresa;

public record EmpresaRequestDto(
        String nomeFantasia,
        String razaoSocial,
        String cnpj,
        String email,
        String telefone
) {}