package com.marketing.desktop.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "empresas")
public class Empresa {

    @Id
    private Long id;

    private String nome;
    private String cnpj;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    public Empresa() {}

    public Empresa(Long id, String nome, String cnpj, LocalDateTime dataCriacao) {
        this.id = id;
        this.nome = nome;
        this.cnpj = cnpj;
        this.dataCriacao = dataCriacao;
    }

    // Getters e Setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }
    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
}