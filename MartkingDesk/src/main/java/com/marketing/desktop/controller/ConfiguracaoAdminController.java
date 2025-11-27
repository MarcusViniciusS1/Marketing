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

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.time.LocalDateTime;

public class ConfiguracaoAdminController {

    @FXML private TextField txtNome;
    @FXML private TextField txtCpf;
    @FXML private TextField txtEmail;
    @FXML private TextField txtTelefone;
    @FXML private PasswordField txtSenha;

    @FXML
    public void cadastrarAdmin() {
        // 1. Antes de tudo, garante que o banco existe
        if (!garantirBancoExistente()) {
            return; // Se falhou ao criar o banco, para aqui.
        }

        EntityManagerFactory emf = null;
        EntityManager em = null;

        try {
            // Agora que o banco existe, o Hibernate consegue conectar
            emf = Persistence.createEntityManagerFactory("marketingPU");
            em = emf.createEntityManager();

            em.getTransaction().begin();

            // 2. Tenta encontrar a empresa ID 1
            Empresa empresaPadrao = em.find(Empresa.class, 1L);

            // 3. Se não existir, CRIA UMA NOVA
            if (empresaPadrao == null) {
                empresaPadrao = new Empresa();
                empresaPadrao.setNomeFantasia("Empresa Matriz");
                empresaPadrao.setRazaoSocial("Matriz Admin Ltda");
                empresaPadrao.setCnpj("00.000.000/0001-00");
                empresaPadrao.setEmail("admin@sistema.com");
                empresaPadrao.setTelefone("00000000");
                empresaPadrao.setDataCadastro(LocalDateTime.now());

                em.persist(empresaPadrao);
            }

            // 4. Cria o usuário Admin
            Usuario admin = new Usuario();
            admin.setNome(txtNome.getText());
            admin.setCpf(txtCpf.getText());
            admin.setEmail(txtEmail.getText());
            admin.setTelefone(txtTelefone.getText());
            admin.setSenha(txtSenha.getText());
            admin.setPerfil("ADMIN");
            admin.setDataCadastro(LocalDateTime.now());

            // 5. Vincula à empresa
            admin.setEmpresa(empresaPadrao);

            em.persist(admin);
            em.getTransaction().commit();

            mostrarAlerta(Alert.AlertType.INFORMATION, "Sucesso", "Banco criado e Admin cadastrado!");
            limparCampos();

        } catch (Exception e) {
            if (em != null && em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
            mostrarAlerta(Alert.AlertType.ERROR, "Erro", "Falha ao salvar: " + e.getMessage());
        } finally {
            if (em != null) em.close();
            if (emf != null) emf.close();
        }
    }

    private boolean garantirBancoExistente() {

        String urlBase = "jdbc:postgresql://localhost:5432/marketing_db";
        String usuario = "postgres";
        String senha = "Sen@c2023";

        try (Connection conn = DriverManager.getConnection(urlBase, usuario, senha);
             Statement stmt = conn.createStatement()) {
         try {
                System.out.println("Verificando/Criando banco de dados 'marketing_db'...");
                // Consulta se existe
                var rs = stmt.executeQuery("SELECT 1 FROM pg_database WHERE datname = 'marketing_db'");
                if (!rs.next()) {
                    stmt.execute("CREATE DATABASE marketing_db");
                    System.out.println("Banco 'marketing_db' criado com sucesso!");
                } else {
                    System.out.println("Banco 'marketing_db' já existe.");
                }
                return true;

            } catch (Exception e) {

                System.out.println("Aviso ao criar banco: " + e.getMessage());

                return true;
            }

        } catch (Exception e) {
            e.printStackTrace();
            mostrarAlerta(Alert.AlertType.ERROR, "Erro Crítico",
                    "Não foi possível conectar ao PostgreSQL para criar o banco.\n" +
                            "Verifique se o Docker/Serviço está rodando.\nErro: " + e.getMessage());
            return false;
        }
    }

    private void mostrarAlerta(Alert.AlertType tipo, String titulo, String mensagem) {
        Alert alert = new Alert(tipo);
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