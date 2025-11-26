package com.senac.AulaFullStack.infra.external;

import com.senac.AulaFullStack.domain.interfaces.IEnvioEmail;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDateTime;

@Component
public class EnvioEmailRepository implements IEnvioEmail {

    @Autowired
    private JavaMailSender javaMailSender;

    @Async
    @Override
    public void enviarEmailComTemplate(String para, String assunto, String texto) {
        try {
            MimeMessage mensagem = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensagem, true, "UTF-8");

            // Tenta carregar o template, ou usa um fallback simples
            String htmlTemplate = carregarTemplateEmail();

            // O "texto" aqui será o CÓDIGO DE RECUPERAÇÃO gerado pelo UsuarioService
            String htmlFinal = htmlTemplate
                    .replace("${titulo}", assunto)
                    .replace("${mensagem}", texto) // Aqui entra o código
                    .replace("${dataEnvio}", LocalDateTime.now().toString());

            helper.setFrom("auroraborealsenac@gmail.com");
            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(htmlFinal, true);

            javaMailSender.send(mensagem);
        } catch (Exception e) {
            e.printStackTrace();
            // Em produção, idealmente usar um Logger (slf4j)
            throw new RuntimeException("Erro ao enviar e-mail de recuperação: " + e.getMessage());
        }
    }

    private String carregarTemplateEmail() {
        try {
            ClassPathResource resource = new ClassPathResource("/templates/email-template.html");
            byte[] bytes = Files.readAllBytes(resource.getFile().toPath());
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (IOException e) {
            // Fallback caso o arquivo HTML não seja encontrado
            return """
                   <html>
                    <body>
                        <div style='text-align: center; padding: 20px; border: 1px solid #ccc;'>
                            <h1>${titulo}</h1>
                            <h3>Seu código é:</h3>
                            <h2 style='color: blue;'>${mensagem}</h2>
                            <br>
                            <small>Enviado em: ${dataEnvio}</small>
                        </div>
                    </body>
                   </html>
                   """;
        }
    }
}