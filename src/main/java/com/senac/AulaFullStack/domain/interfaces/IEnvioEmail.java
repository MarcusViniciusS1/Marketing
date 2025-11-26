package com.senac.AulaFullStack.domain.interfaces;

public interface IEnvioEmail {
    // Único método necessário para enviar o token/código de recuperação
    void enviarEmailComTemplate(String para, String assunto, String texto);
}