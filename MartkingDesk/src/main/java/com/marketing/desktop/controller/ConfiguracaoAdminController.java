package com.marketing.desktop.controller;

import com.marketing.desktop.model.Empresa;
import com.marketing.desktop.model.Usuario;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import java.time.LocalDateTime;

public class ConfiguracaoAdminController {

    @FXML private TextField txtNome;
    @FXML private TextField txtCpf;
    @FXML private TextField txtEmail;
    @FXML private TextField txtTelefone;
    @FXML private PasswordField txtSenha;

    // Garanta que "marketingPU" é o nome que está no seu persistence.xml
    private final EntityManagerFactory emf = Persistence.createEntityManagerFactory("marketingPU");

    @FXML
    public void cadastrarAdmin() {
        EntityManager em = emf.createEntityManager();

        try {
            em.getTransaction().begin();

            // 1. Tenta encontrar a empresa ID 1
            Empresa empresaPadrao = em.find(Empresa.class, 1L);

            // 2. Se não existir, CRIA UMA NOVA (Isso corrige o erro de chave estrangeira)
            if (empresaPadrao == null) {
                System.out.println("Empresa ID 1 não encontrada. Criando nova...");
                empresaPadrao = new Empresa();
                empresaPadrao.setNomeFantasia("Empresa Matriz");
                empresaPadrao.setRazaoSocial("Matriz Admin Ltda");
                empresaPadrao.setCnpj("00.000.000/0001-00");
                empresaPadrao.setEmail("admin@sistema.com");
                empresaPadrao.setTelefone("00000000");
                empresaPadrao.setDataCadastro(LocalDateTime.now());

                em.persist(empresaPadrao);
            }

            // 3. Cria o usuário Admin
            Usuario admin = new Usuario();
            admin.setNome(txtNome.getText());
            admin.setCpf(txtCpf.getText());
            admin.setEmail(txtEmail.getText());
            admin.setTelefone(txtTelefone.getText());
            admin.setSenha(txtSenha.getText());
            admin.setPerfil("ADMIN"); // Define como ADMIN
            admin.setDataCadastro(LocalDateTime.now());

            // 4. Vincula à empresa (que agora com certeza existe)
            admin.setEmpresa(empresaPadrao);

            em.persist(admin);
            em.getTransaction().commit();

            mostrarAlerta("Sucesso", "Admin cadastrado com sucesso!");
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