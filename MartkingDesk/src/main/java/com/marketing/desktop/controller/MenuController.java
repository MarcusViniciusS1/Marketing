package com.marketing.desktop.controller;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.stage.Modality;
import javafx.stage.Stage;
import java.net.URL;

public class MenuController {

    @FXML
    public void abrirConfiguracaoAdmin(ActionEvent event) {
        try {
            // 1. Tenta localizar o arquivo FXML
            // Tente primeiro sem pasta (direto em resources)
            String caminhoFxml = "/ConfiguracaoAdmin.fxml";
            URL arquivoFxml = getClass().getResource(caminhoFxml);

            // Se não achar, tenta dentro da estrutura de pacotes (comum em projetos Maven)
            if (arquivoFxml == null) {
                caminhoFxml = "/com/marketing/desktop/view/ConfiguracaoAdmin.fxml";
                arquivoFxml = getClass().getResource(caminhoFxml);
            }

            // Se ainda for nulo, lança erro para avisar
            if (arquivoFxml == null) {
                throw new RuntimeException("Arquivo 'ConfiguracaoAdmin.fxml' não encontrado em resources!");
            }

            // 2. Carrega a tela
            FXMLLoader loader = new FXMLLoader(arquivoFxml);
            Parent root = loader.load();

            // 3. Configura e abre a nova janela
            Stage stage = new Stage();
            stage.setTitle("Configuração Administrador");
            stage.setScene(new Scene(root));
            stage.initModality(Modality.APPLICATION_MODAL); // Bloqueia a janela de trás
            stage.show();

        } catch (Exception e) {
            // Mostra o erro na tela para você saber o que houve
            e.printStackTrace();
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Erro ao abrir janela");
            alert.setHeaderText(null);
            alert.setContentText("Erro: " + e.getMessage());
            alert.showAndWait();
        }
    }

    @FXML
    public void sair() {
        System.exit(0);
    }
}