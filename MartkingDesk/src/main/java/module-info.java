module com.marketing.desktop {
    requires javafx.controls;
    requires javafx.fxml;
    requires jakarta.persistence;
    requires org.hibernate.orm.core;

    opens com.marketing.desktop to javafx.fxml;
    opens com.marketing.desktop.model to org.hibernate.orm.core;

    exports com.marketing.desktop;
    exports com.marketing.desktop.controller;
    opens com.marketing.desktop.controller to javafx.fxml;
}