package com.senac.AulaFullStack.domain.entity;

import com.senac.AulaFullStack.application.dto.canal.CanalResponseDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "canal")
public class Canal {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome; // Ex: Instagram, Google Ads, LinkedIn

    public CanalResponseDto toDto() {
        return new CanalResponseDto(id, nome);
    }
}