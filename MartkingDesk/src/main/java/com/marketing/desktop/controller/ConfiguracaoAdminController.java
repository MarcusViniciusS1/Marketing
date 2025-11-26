package com.marketing.desktop.controller;

import com.marketing.desktop.model.Empresa; // Verifique se o pacote é este ou domain.entity
import com.marketing.desktop.model.Usuario; // Verifique se o pacote é este ou domain.entity
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import java.time.LocalDateTime;

public class ConfiguracaoAdminController {

    @FXML
    private TextField txtNome;

    @FXML
    private TextField txtCpf;

    @FXML
    private TextField txtEmail;

    @FXML
    private TextField txtTelefone;

    @FXML
    private PasswordField txtSenha;

    // Factory do Hibernate (JPA)
    private final EntityManagerFactory emf = Persistence.createEntityManagerFactory("marketingPU");

    @FXML
    public void cadastrarAdmin() {
        EntityManager em = emf.createEntityManager();

        try {
            em.getTransaction().begin();

            // ==================================================================================
            // CORREÇÃO DO ERRO: Verificar/Criar a Empresa antes de criar o Usuário
            // ==================================================================================

            // Tenta buscar a empresa padrão (ID 1)
            Empresa empresaPadrao = em.find(Empresa.class, 1L);

            // Se não existir, CRIA ELA AGORA para evitar o erro de chave estrangeira
            if (empresaPadrao == null) {
                empresaPadrao = new Empresa();
                // Preencha os dados obrigatórios da sua entidade Empresa
                empresaPadrao.setNomeFantasia("Minha Empresa Matriz");
                empresaPadrao.setRazaoSocial("Empresa Admin Ltda");
                empresaPadrao.setCnpj("00.000.000/0001-00");
                empresaPadrao.setEmail("admin@empresa.com");
                empresaPadrao.setTelefone("0000000000");
                empresaPadrao.setDataCadastro(LocalDateTime.now());
                // Se tiver outros campos obrigatórios (NOT NULL) na Empresa, defina aqui!

                em.persist(empresaPadrao); // Salva a empresa e gera o ID 1
            }

            // ==================================================================================
            // CRIAÇÃO DO USUÁRIO ADMIN
            // ==================================================================================

            Usuario admin = new Usuario();
            admin.setNome(txtNome.getText());
            admin.setCpf(txtCpf.getText());
            admin.setEmail(txtEmail.getText());
            admin.setTelefone(txtTelefone.getText());
            admin.setSenha(txtSenha.getText()); // Em produção, use hash/criptografia!
            admin.setRole("ADMIN"); // Define como Admin
            admin.setDataCadastro(LocalDateTime.now());

            // VINCULA O USUÁRIO À EMPRESA QUE ACABAMOS DE GARANTIR QUE EXISTE
            admin.setEmpresa(empresaPadrao);

            // Salva o usuário
            em.persist(admin);

            em.getTransaction().commit();
            mostrarAlerta("Sucesso", "Usuário Admin e Empresa Padrão cadastrados!");
            limparCampos();

        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
            mostrarAlerta("Erro", "Falha ao cadastrar: " + e.getMessage());
        } finally {
            em.close();
        }
    }

    private void mostrarAlerta(String titulo, String mensagem) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle(titulo);
        alert.setHeaderText(null);
        alert.setContentText(mensagem);
        alert.showAndWait();
    }

    private void limparCampos() {
        txtNome.clear();
        txtCpf.clear();
        txtEmail.clear();
        txtTelefone.clear();
        txtSenha.clear();
    }
}