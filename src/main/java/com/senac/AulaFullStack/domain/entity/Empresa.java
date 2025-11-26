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
    private String setor;
    private String emailCorporativo;
    private String telefone;
    private String cidade;
    private String endereco;
    private LocalDateTime dataCadastro;

    @OneToMany(mappedBy = "empresa")
    private List<Usuario> equipe;

    public Empresa(EmpresaRequestDto dto) {
        this.nomeFantasia = dto.nomeFantasia();
        this.razaoSocial = dto.razaoSocial();
        this.cnpj = dto.cnpj();
        this.setor = dto.setor();
        this.emailCorporativo = dto.email();
        this.telefone = dto.telefone();
        this.cidade = dto.cidade();
        this.endereco = dto.endereco();
        this.dataCadastro = LocalDateTime.now();
    }

    public void atualizar(EmpresaRequestDto dto) {
        this.nomeFantasia = dto.nomeFantasia();
        this.razaoSocial = dto.razaoSocial();
        this.setor = dto.setor();
        this.emailCorporativo = dto.email();
        this.telefone = dto.telefone();
        this.cidade = dto.cidade();
        this.endereco = dto.endereco();
    }

    public EmpresaResponseDto toDto() {
        return new EmpresaResponseDto(id, nomeFantasia, cnpj, setor, emailCorporativo, telefone, cidade);
    }
}