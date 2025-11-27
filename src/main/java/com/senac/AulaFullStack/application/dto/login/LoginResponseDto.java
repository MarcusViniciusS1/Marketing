package com.senac.AulaFullStack.application.dto.login;

public record LoginResponseDto(String token, String role, Long empresaId, String nome) {}