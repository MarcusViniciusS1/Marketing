package com.marketing.desktop.controller;

import com.marketing.desktop.model.Empresa;
import com.marketing.desktop.model.Usuario;
import com.marketing.desktop.utils.JPAUtils;
import jakarta.persistence.EntityManager;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.time.LocalDateTime;

public class ConfiguracaoAdminController {

    @FXML private TextField txtNome;
    @FXML private TextField txtEmail;
    @FXML private TextField txtSenha;
    @FXML private TextField txtCpf;
    @FXML private TextField txtTelefone;

    public void cadastrarAdmin(ActionEvent event) {
        if (txtNome.getText().isEmpty() || txtEmail.getText().isEmpty() || txtSenha.getText().isEmpty()) {
            showAlert(Alert.AlertType.ERROR, "Erro", "Preencha os campos obrigatórios!");
            return;
        }

        EntityManager entityManager = null;
        try {
            entityManager = JPAUtils.getEntityManager();
            entityManager.getTransaction().begin();

            final Long EMPRESA_ID = 1L;
            final String CNPJ_PADRAO = "00.000.000/0001-00";

            Empresa empresa = entityManager.find(Empresa.class, EMPRESA_ID);

            if (empresa == null) {
                // NOME ALTERADO PARA MARKETINGDESK
                empresa = new Empresa(EMPRESA_ID, "MarketingDESK Matriz", CNPJ_PADRAO, LocalDateTime.now());
            }
            entityManager.merge(empresa);

            Usuario usuario = new Usuario();
            usuario.setNome(txtNome.getText());
            usuario.setEmail(txtEmail.getText());
            usuario.setSenha(txtSenha.getText());
            usuario.setCpf(txtCpf.getText());
            usuario.setTelefone(txtTelefone.getText());
            usuario.setDataCadastro(LocalDateTime.now());
            usuario.setRole("ADMIN"); // Role correto
            usuario.setEmpresaId(EMPRESA_ID);

            entityManager.persist(usuario);
            entityManager.getTransaction().commit();

            showAlert(Alert.AlertType.INFORMATION, "Sucesso", "Administrador cadastrado com sucesso!");
            limparCampos();

        } catch (Exception e) {
            if (entityManager != null && entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            e.printStackTrace();
            showAlert(Alert.AlertType.ERROR, "Erro", "Falha ao cadastrar: " + e.getMessage());
        } finally {
            if (entityManager != null) {
                entityManager.close();
            }
        }
    }

    public void voltar(ActionEvent event) throws Exception {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/com/marketing/desktop/menu-view.fxml"));
        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);
    }

    private void showAlert(Alert.AlertType type, String title, String content) {
        Alert alert = new Alert(type);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.setContentText(content);
        alert.showAndWait();
    }

    private void limparCampos() {
        txtNome.clear();
        txtEmail.clear();
        txtSenha.clear();
        txtCpf.clear();
        txtTelefone.clear();
    }
}