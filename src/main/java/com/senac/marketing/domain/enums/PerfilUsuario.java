// src/main/java/com/senac/marketing/enums/PerfilUsuario.java
package com.senac.marketing.enums;

/**
 * Enum que representa os perfis de usuário do sistema.
 * ADMIN: Possui acesso total e pode gerenciar todas as empresas.
 * USUARIO_EMPRESA: Possui acesso limitado aos dados de sua própria empresa.
 */
public enum PerfilUsuario {
    ADMIN,
    USUARIO_EMPRESA
}