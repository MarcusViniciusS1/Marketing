package com.marketing.desktop.controller;

import com.marketing.desktop.model.Empresa;
import com.marketing.desktop.model.Usuario;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Persistence;
import jakarta.persistence.Query;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
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
        // 1. TENTA CRIAR O BANCO SE NÃO EXISTIR
        if (!garantirBancoExistente()) {
            return;
        }

        EntityManagerFactory emf = null;
        EntityManager em = null;

        try {
            emf = Persistence.createEntityManagerFactory("marketingPU");
            em = emf.createEntityManager();
            em.getTransaction().begin();

            // --- ADICIONADO: VERIFICAÇÃO DE DUPLICIDADE ---
            if (verificarDuplicidade(em, txtCpf.getText())) {
                mostrarAlerta(Alert.AlertType.WARNING, "Duplicidade",
                        "Já existe um usuário cadastrado com este CPF. Use dados únicos.");
                em.getTransaction().rollback();
                return;
            }
            // ---------------------------------------------

            // 2. Verifica se a empresa matriz já existe
            Empresa empresaPadrao = em.find(Empresa.class, 1L);

            if (empresaPadrao == null) {
                empresaPadrao = new Empresa();
                empresaPadrao.setNomeFantasia("Empresa Matriz (Super Admin)");
                empresaPadrao.setRazaoSocial("Matriz Admin Ltda");
                empresaPadrao.setCnpj("00.000.000/0001-00");
                empresaPadrao.setEmail("admin@sistema.com");
                empresaPadrao.setTelefone("00000000");
                empresaPadrao.setDataCadastro(LocalDateTime.now());
                em.persist(empresaPadrao);
            }

            // 3. Cria o Admin (com dados únicos)
            Usuario admin = new Usuario();
            admin.setNome(txtNome.getText());
            admin.setCpf(txtCpf.getText());
            admin.setEmail(txtEmail.getText());
            admin.setTelefone(txtTelefone.getText());
            admin.setSenha(txtSenha.getText());
            admin.setPerfil("ADMIN");
            admin.setDataCadastro(LocalDateTime.now());
            admin.setEmpresa(empresaPadrao);

            em.persist(admin);
            em.getTransaction().commit();

            mostrarAlerta(Alert.AlertType.INFORMATION, "Sucesso", "Admin cadastrado! Agora você pode criar múltiplos Administradores.");
            limparCampos();

        } catch (Exception e) {
            if (em != null && em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
            mostrarAlerta(Alert.AlertType.ERROR, "Erro", "Falha ao salvar dados. Verifique a unicidade do E-mail e CPF: " + e.getMessage());
        } finally {
            if (em != null) em.close();
            if (emf != null) emf.close();
        }
    }

    /**
     * Verifica se já existe um usuário com este CPF no banco de dados.
     */
    private boolean verificarDuplicidade(EntityManager em, String cpf) {
        try {
            // JPQL para buscar um usuário pelo CPF
            Query query = em.createQuery("SELECT u FROM Usuario u WHERE u.cpf = :cpf");
            query.setParameter("cpf", cpf);
            query.getSingleResult(); // Tenta buscar um resultado
            return true; // Se achou, retorna true (duplicado)
        } catch (NoResultException e) {
            return false; // Se não achou, retorna false (OK para cadastrar)
        } catch (Exception e) {
            // Pode ser outro erro, mas para o contexto, evitamos o cadastro
            return true;
        }
    }

    private boolean garantirBancoExistente() {
        String urlBase = "jdbc:postgresql://localhost:5432/postgres";
        String usuario = "postgres";
        String senha = "Sen@c2023";

        try (Connection conn = DriverManager.getConnection(urlBase, usuario, senha);
             Statement stmt = conn.createStatement()) {

            ResultSet rs = stmt.executeQuery("SELECT 1 FROM pg_database WHERE datname = 'marketing_db'");

            if (!rs.next()) {
                System.out.println("Banco não encontrado. Criando 'marketing_db'...");
                stmt.execute("CREATE DATABASE marketing_db");
                System.out.println("Banco criado com sucesso!");
            } else {
                System.out.println("Banco 'marketing_db' já existe. Prosseguindo...");
            }
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            mostrarAlerta(Alert.AlertType.ERROR, "Erro de Conexão",
                    "Não foi possível conectar ao PostgreSQL inicial.\n" +
                            "Verifique se o Docker/Serviço está rodando e se a senha está correta.\n\nErro técnico: " + e.getMessage());
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