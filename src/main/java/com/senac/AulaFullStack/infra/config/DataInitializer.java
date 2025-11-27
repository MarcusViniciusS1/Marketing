package com.senac.AulaFullStack.infra.config;

import com.senac.AulaFullStack.domain.entity.Canal;
import com.senac.AulaFullStack.domain.repository.CanalRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(CanalRepository canalRepository) {
        return args -> {
            // Verifica se a tabela de canais está vazia
            if (canalRepository.count() == 0) {
                System.out.println("--- Inicializando Canais de Marketing Padrão ---");

                List<String> canais = List.of(
                        "Google Ads",
                        "Meta Ads (Facebook/Instagram)",
                        "LinkedIn Ads",
                        "Email Marketing",
                        "SEO / Orgânico",
                        "TikTok Ads",
                        "YouTube Ads",
                        "Influenciadores",
                        "Eventos / Offline"
                );

                for (String nome : canais) {
                    // Cria o objeto Canal (passando null no ID para o banco gerar)
                    Canal canal = new Canal(null, nome);
                    canalRepository.save(canal);
                }

                System.out.println("--- " + canais.size() + " Canais inseridos com sucesso! ---");
            } else {
                System.out.println("--- Canais já carregados no banco. Pulando inicialização. ---");
            }
        };
    }
}