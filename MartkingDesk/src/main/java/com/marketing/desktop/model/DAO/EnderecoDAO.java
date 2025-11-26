package com.marketing.desktop.model.DAO;

import com.marketing.desktop.model.Endereco;
import jakarta.persistence.EntityManager;

public class EnderecoDAO {
    private EntityManager entityManager;
    public EnderecoDAO(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    public void salvar(Endereco e){
        entityManager.getTransaction().begin();

        entityManager.persist(e);

        entityManager.getTransaction().commit();
    }



}
