/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository.impl;

import com.pn.pojo.Follow;
import com.pn.repository.FollowRepository;
import java.util.List;
import javax.persistence.NoResultException;
import org.hibernate.Session;
import org.hibernate.query.Query;
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
public class FollowRepositoryImpl implements FollowRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public Follow getFollowing(String followUsername, String followingUsername) {
        Session s = this.factory.getObject().getCurrentSession();
        String hql = "FROM Follow follow WHERE follow.followUserId.username = :followUsername "
                + "AND follow.beFollowedUserId.username = :followingUsername "
                + "ORDER BY follow.id DESC";
        Query query = s.createQuery(hql);
        query.setParameter("followUsername", followUsername);
        query.setParameter("followingUsername", followingUsername);
        query.setMaxResults(1);
        try {
            return (Follow) query.getSingleResult();
        } catch (NoResultException exception) {
            return null;
        }
    }

    @Override
    public List<Follow> getFollowers(String username, int maxValue) {
        Session s = this.factory.getObject().getCurrentSession();
        String hql = "FROM Follow follow "
                + "WHERE follow.beFollowedUserId.username = :username "
                + "AND follow.followUserId.isDeleted = 0 "
                + "ORDER BY follow.id DESC";

        Query query = s.createQuery(hql);
        query.setParameter("username", username);
        if (maxValue > -1) {
            query.setMaxResults(maxValue);
        }
        try {
            return query.getResultList();
        } catch (NoResultException exception) {
            return null;
        }
    }

    @Override
    public List<Follow> getFollowings(String username, int maxValue) {
        Session s = this.factory.getObject().getCurrentSession();
        String hql = "FROM Follow follow "
                + "WHERE follow.followUserId.username = :username "
                + "AND follow.beFollowedUserId.isDeleted = 0 "
                + "ORDER BY follow.id DESC";
        Query query = s.createQuery(hql);
        query.setParameter("username", username);
        if (maxValue > -1) {
            query.setMaxResults(maxValue);
        }
        try {
            return query.getResultList();
        } catch (NoResultException exception) {
            return null;
        }
    }

    @Override
    public Follow addFollow(Follow follow) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            s.save(follow);
            return follow;
        } catch (Exception ex) {
            return null;
        }

    }

    @Override
    public Boolean removeFollow(int followId) {
        Session s = this.factory.getObject().getCurrentSession();
        Follow delFollow = s.get(Follow.class, followId);
        try {
            s.delete(delFollow);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public int getCountFollowers(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        String hql = "SELECT COUNT(*) FROM Follow follow "
                + "WHERE follow.beFollowedUserId.username = :username "
                + "AND follow.followUserId.isDeleted = 0 ";

        Query query = s.createQuery(hql);
        query.setParameter("username", username);
        query.setMaxResults(1);
        Long count = (Long) query.getSingleResult();
        return count.intValue();
    }

    @Override
    public int getCountFollowings(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        String hql = "SELECT COUNT(*) "
                + "FROM Follow follow "
                + "WHERE follow.followUserId.username = :username "
                + "AND follow.beFollowedUserId.isDeleted = 0 ";

        Query query = s.createQuery(hql);
        query.setParameter("username", username);
        query.setMaxResults(1);

        Long count = (Long) query.getSingleResult();

        return count.intValue();
    }

    @Override
    public Follow getFollowById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        Follow follow = s.get(Follow.class, id);
        return follow;
    }

}
