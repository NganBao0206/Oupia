/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository.impl;

import com.pn.pojo.Comment;
import com.pn.pojo.Image;
import com.pn.repository.CommentRepository;
import java.util.List;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author yuu
 */
@Repository
@Transactional
public class CommentRepositoryImpl implements CommentRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Autowired
    private Environment env;

    @Override
    public Comment addComment(Comment cmt) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(cmt);
        return cmt;
    }

    @Override
    public List<Comment> getComments(String slugPost, int page) {
        Session s = this.factory.getObject().getCurrentSession();
        String hql = "FROM Comment cmt WHERE cmt.postId.slug = :slugPost ORDER BY cmt.id DESC";
        Query query = s.createQuery(hql);
        query.setParameter("slugPost", slugPost);
         if (page != -1) {
            int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));
            query.setFirstResult((page - 1) * pageSize);
            query.setMaxResults(pageSize);
        }
        try {
            return query.getResultList();
        } catch (NoResultException exception) {
            return null;
        }
    }
    
    @Override
    public int getCount(String slugPost) {
        Session s = this.factory.getObject().getCurrentSession();
        String hql = "SELECT COUNT(*) FROM Comment cmt WHERE cmt.postId.slug = :slugPost";
        Query query = s.createQuery(hql);
        query.setParameter("slugPost", slugPost);
        Long rs = (Long) query.getSingleResult();
        return rs.intValue();
    }

}
