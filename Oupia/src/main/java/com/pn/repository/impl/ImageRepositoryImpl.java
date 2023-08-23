/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository.impl;

import com.pn.pojo.Image;
import com.pn.pojo.Motel;
import com.pn.repository.ImageRepository;
import java.util.List;
import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author yuu
 */
@Repository
@Transactional
public class ImageRepositoryImpl implements ImageRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<Image> getImagesByPost(int postId) {
        Session session = this.factory.getObject().getCurrentSession();
        Query query = session.createQuery("FROM Image i WHERE i.postId = :postId");
        query.setParameter("postId", postId);

        return query.getResultList();
    }

    @Override
    public int countImage(int postId) {
        Session session = this.factory.getObject().getCurrentSession();
        Query query = session.createQuery("SELECT COUNT (*) FROM Image WHERE postId.id = :postId");
        query.setParameter("postId", postId);
        query.setMaxResults(1);
        return (int) query.getSingleResult();
    }

    @Override
    public Image getImageByPost(int postId) {
        Session session = this.factory.getObject().getCurrentSession();
        Query query = session.createQuery("FROM Image i WHERE i.postId.id = :postId");
        query.setParameter("postId", postId);
        query.setMaxResults(1);
        return (Image) query.getSingleResult();
    }

}
