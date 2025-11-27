package com.marketing.desktop.controller;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.stage.Stage;
import java.net.URL;

public class MenuController {

    @FXML
    public void abrirConfiguracaoAdmin() {
        try {
            // --- TENTATIVA 1: Procurar na raiz (src/main/resources/) ---
            String nomeArquivo = "ConfiguracaoAdmin.fxml"; // Verifique se o nome é exato (maiúsculas importam!)

            URL url = getClass().getResource("/" + nomeArquivo);
            System.out.println("Tentativa 1 (Raiz): " + url);

            // --- TENTATIVA 2: Procurar na pasta do pacote (src/main/resources/com/marketing/desktop/...) ---
            if (url == null) {
                url = getClass().getResource("/com/marketing/desktop/view/" + nomeArquivo);
                System.out.println("Tentativa 2 (Pasta View): " + url);
            }

            // --- TENTATIVA 3: Nome antigo que apareceu nos seus logs ---
            if (url == null) {
                url = getClass().getResource("/com/marketing/desktop/configuracaoadmin-view.fxml");
                System.out.println("Tentativa 3 (Nome antigo): " + url);
            }

            // SE NÃO ACHO EM LUGAR NENHUM
            if (url == null) {
                throw new RuntimeException("CRÍTICO: O arquivo FXML não foi encontrado em lugar nenhum! Verifique a pasta 'target/classes'.");
            }

            // Carrega
            FXMLLoader loader = new FXMLLoader(url);
            Parent root = loader.load();

            Stage stage = new Stage();
            stage.setTitle("Configuração Administrador");
            stage.setScene(new Scene(root));
            stage.show();

        } catch (Exception e) {
            e.printStackTrace();
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Erro Fatal");
            alert.setHeaderText("Não foi possível abrir a janela");
            alert.setContentText(e.getMessage());
            alert.showAndWait();
        }
    }

    @FXML
    public void sair() {
        System.exit(0);
    }
}