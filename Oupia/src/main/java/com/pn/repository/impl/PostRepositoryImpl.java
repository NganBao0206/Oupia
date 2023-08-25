/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository.impl;

import com.pn.pojo.Image;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.repository.MotelRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.pn.repository.PostRepository;

/**
 *
 * @author yuumm
 */
@Repository
//@PropertySource("classpath:configs.properties")
@Transactional
public class PostRepositoryImpl implements PostRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private Environment env;

    @Override
    public List<Post> getPosts(Map<String, String> params, List<String> type) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Post> q = b.createQuery(Post.class);
        Root root = q.from(Post.class);
        q.select(root);

        if (params != null) {
            List<Predicate> predicates = new ArrayList<>();

            String deleted = params.get("isDeleted");
            if (deleted != null && !deleted.isEmpty()) {
                if (deleted.equals("0")) {
                    predicates.add(b.equal(root.get("isDeleted"), false));
                } else {
                    predicates.add(b.equal(root.get("isDeleted"), true));
                }
            }
            String kw = params.get("kw");
            if (kw != null && !kw.isEmpty()) {
                Predicate namePredicate = b.like(root.get("name"), "%" + kw + "%");
                predicates.add(namePredicate);
            }

//            if (type != null && type.size() > 0) {
//                List<Predicate> pres = new ArrayList<>();
//
//                for (String st : status) {
//                    pres.add(b.equal(root.get("status"), st));
//                }
//                if (pres.size() > 0) {
//                    Predicate[] predicateArray = pres.toArray(new Predicate[0]);
//                    predicates.add(b.or(predicateArray));
//                }
//            }

            q.where(predicates.toArray(Predicate[]::new));
        }
        Query query = s.createQuery(q);
        String page = params.get("page");
        if (page != null) {
            int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));
            query.setFirstResult((Integer.parseInt(page) - 1) * pageSize);
            query.setMaxResults(pageSize);
        }

        return query.getResultList();
    }

    @Override
    public int countPosts(Map<String, String> params, List<String> type) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Long> q = b.createQuery(Long.class);
        Root root = q.from(Post.class);
        q.select(b.count(root));

        if (params != null) {
            List<Predicate> predicates = new ArrayList<>();

            String deleted = params.get("isDeleted");
            if (deleted != null && !deleted.isEmpty()) {
                if (deleted.equals("0")) {
                    predicates.add(b.equal(root.get("isDeleted"), false));
                } else {
                    predicates.add(b.equal(root.get("isDeleted"), true));
                }
            }
            String kw = params.get("kw");
            if (kw != null && !kw.isEmpty()) {
                Predicate namePredicate = b.like(root.get("name"), "%" + kw + "%");
                predicates.add(namePredicate);
            }

//            if (status != null && status.size() > 0) {
//                List<Predicate> pres = new ArrayList<>();
//
//                for (String st : status) {
//                    pres.add(b.equal(root.get("status"), st));
//                }
//                if (pres.size() > 0) {
//                    Predicate[] predicateArray = pres.toArray(new Predicate[0]);
//                    predicates.add(b.or(predicateArray));
//                }
//            }

            q.where(predicates.toArray(Predicate[]::new));
        }
        Query query = s.createQuery(q);
        Long count = (Long) query.getSingleResult();
        return count.intValue();
    }

    @Override
    public boolean addOrUpdatePost(Post post) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            if (post.getId() == null) {
                s.save(post);
            } else {
                s.update(post);
            }

            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public Post getPostBySlug(String slug) {
        Session session = this.factory.getObject().getCurrentSession();
        Query query = session.createQuery("FROM Post WHERE slug = :slug");
        query.setParameter("slug", slug);
        try {
            return (Post) query.getSingleResult();
        } catch (NoResultException ex) {
            return null; // Trả về null nếu không tìm thấy kết quả
        }
    }

    @Override
    public boolean deletePost(String slug) {
        Session s = this.factory.getObject().getCurrentSession();
        Post post = getPostBySlug(slug);

        if (post != null) {
            post.setIsDeleted(true);
            try {
                s.update(post);
                return true;
            } catch (HibernateException ex) {
                ex.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public boolean destroyPost(String slug) {
        Session s = this.factory.getObject().getCurrentSession();
        Post post = getPostBySlug(slug);

        if (post != null && post.getIsDeleted()) {
            try {
                s.delete(post);
                return true;
            } catch (HibernateException ex) {
                ex.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public boolean restorePost(String slug) {
        Session s = this.factory.getObject().getCurrentSession();
        Post post = getPostBySlug(slug);

        if (post != null) {
            post.setIsDeleted(false);
            try {
                s.update(post);
                return true;
            } catch (HibernateException ex) {
                ex.printStackTrace();
            }
        }
        return false;
    }
}
