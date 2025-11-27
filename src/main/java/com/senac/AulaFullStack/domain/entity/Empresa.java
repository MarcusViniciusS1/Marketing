package com.senac.AulaFullStack.domain.entity;

import com.senac.AulaFullStack.application.dto.empresa.EmpresaRequestDto;
import com.senac.AulaFullStack.application.dto.empresa.EmpresaResponseDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "empresa")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeFantasia;
    private String razaoSocial;
    private String cnpj;
    private String emailCorporativo;
    private String telefone;

    // Campos opcionais
    private String setor;
    private String cidade;
    private String endereco;

    private LocalDateTime dataCadastro;

    // CASCADE ALL: Se apagar a empresa, apaga a equipe e as campanhas automaticamente
    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Usuario> equipe;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Campanha> campanhas;

    public Empresa(EmpresaRequestDto dto) {
        this.nomeFantasia = dto.nomeFantasia();
        this.razaoSocial = dto.razaoSocial();
        this.cnpj = dto.cnpj();
        this.emailCorporativo = dto.email();
        this.telefone = dto.telefone();
        this.dataCadastro = LocalDateTime.now();
    }

    public void atualizar(EmpresaRequestDto dto) {
        this.nomeFantasia = dto.nomeFantasia();
        this.razaoSocial = dto.razaoSocial();
        this.emailCorporativo = dto.email();
        this.telefone = dto.telefone();
    }

    public EmpresaResponseDto toDto() {
        return new EmpresaResponseDto(
                id, nomeFantasia, cnpj, setor, emailCorporativo, telefone, cidade
        );
    }
}