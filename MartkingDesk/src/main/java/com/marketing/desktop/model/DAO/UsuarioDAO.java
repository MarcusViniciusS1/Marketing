package com.marketing.desktop.model.DAO;

import com.marketing.desktop.model.Usuario;
import jakarta.persistence.EntityManager;

public class UsuarioDAO {
    private EntityManager entityManager;
    public UsuarioDAO (EntityManager entityManager){
        this.entityManager = entityManager;
    }

    public void salvar(Usuario u){
        entityManager.getTransaction().begin();

        entityManager.persist(u);

        entityManager.getTransaction().commit();
    }

}
