/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository.impl;

import com.pn.pojo.Favourite;
import com.pn.repository.FavouriteRepository;
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
public class FavouriteRepositoryImpl implements FavouriteRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public Favourite getFavourStatus(int userId, int postId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query query = s.createQuery("FROM Favourite WHERE userId.id = :userId AND postId.id = :postId");
        query.setParameter("userId", userId);
        query.setParameter("postId", postId);
        try {
            return (Favourite) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public List<Favourite> getFavouritesOfUser(int userId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query query = s.createQuery("FROM Favourite WHERE userId.id = :userId");
        query.setParameter("userId", userId);
        return (List<Favourite>) query.getResultList();

    }

    @Override
    public Favourite addFavourite(Favourite fav) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            s.save(fav);
            return fav;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Favourite getFavById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Favourite.class, id);
    }

    @Override
    public Boolean removeFavourite(int favId) {
        Session s = this.factory.getObject().getCurrentSession();
        Favourite delFav = s.get(Favourite.class, favId);
        try {
            s.delete(delFav);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

}
