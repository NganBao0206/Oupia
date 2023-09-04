/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository.impl;

import com.pn.pojo.Image;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.PostRentDetail;
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

/**
 *
 * @author yuumm
 */
@Repository
//@PropertySource("classpath:configs.properties")
@Transactional
public class MotelRepositoryImpl implements MotelRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private Environment env;

    @Override
    public List<Motel> getMotels(Map<String, String> params, List<String> status) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Motel> q = b.createQuery(Motel.class);
        Root root = q.from(Motel.class);
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

            String username = params.get("username");
            if (username != null && !username.isEmpty()) {
                Predicate userPredicate = b.equal(root.get("userId").get("username"), username);
                predicates.add(userPredicate);
            }

            String userId = params.get("userId");
            if (userId != null && !userId.isEmpty()) {
                Predicate userPredicate = b.equal(root.get("userId").get("id"), userId);
                predicates.add(userPredicate);
            }

            if (status != null && status.size() > 0) {
                List<Predicate> pres = new ArrayList<>();

                for (String st : status) {
                    pres.add(b.equal(root.get("status"), st));
                }
                if (pres.size() > 0) {
                    Predicate[] predicateArray = pres.toArray(new Predicate[0]);
                    predicates.add(b.or(predicateArray));
                }
            }

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
    public int countMotels(Map<String, String> params, List<String> status) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Long> q = b.createQuery(Long.class);
        Root root = q.from(Motel.class);
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

            String username = params.get("username");
            if (username != null && !username.isEmpty()) {
                Predicate userPredicate = b.equal(root.get("userId").get("username"), username);
                predicates.add(userPredicate);
            }

            String userId = params.get("userId");
            if (userId != null && !userId.isEmpty()) {
                Predicate userPredicate = b.equal(root.get("userId").get("id"), userId);
                predicates.add(userPredicate);
            }

            if (status != null && status.size() > 0) {
                List<Predicate> pres = new ArrayList<>();

                for (String st : status) {
                    pres.add(b.equal(root.get("status"), st));
                }
                if (pres.size() > 0) {
                    Predicate[] predicateArray = pres.toArray(new Predicate[0]);
                    predicates.add(b.or(predicateArray));
                }
            }

            q.where(predicates.toArray(Predicate[]::new));
        }
        Query query = s.createQuery(q);
        Long count = (Long) query.getSingleResult();
        return count.intValue();
    }

    @Override
    public boolean addOrUpdateMotel(Motel motel) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            if (motel.getId() == null) {
                s.save(motel);
            } else {
                s.update(motel);
            }

            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public Motel getMotelBySlug(String slug) {
        Session session = this.factory.getObject().getCurrentSession();
        Query query = session.createQuery("FROM Motel WHERE slug = :slug");
        query.setParameter("slug", slug);

        try {
            return (Motel) query.getSingleResult();
        } catch (NoResultException ex) {
            return null; // Trả về null nếu không tìm thấy kết quả
        }
    }

    @Override
    public boolean deleteMotel(String slug) {
        Session s = this.factory.getObject().getCurrentSession();
        Motel motel = getMotelBySlug(slug);

        if (motel != null) {

            motel.setIsDeleted(true);
            try {
                s.update(motel);
                return true;
            } catch (HibernateException ex) {
                ex.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public boolean destroyMotel(String slug) {
        Session s = this.factory.getObject().getCurrentSession();
        Motel motel = getMotelBySlug(slug);
        for (PostRentDetail postRentDetail : motel.getPostRentDetailSet()) {
            Post post = postRentDetail.getPostId();
            s.delete(post); // Xóa đối tượng Post
            s.delete(postRentDetail); // Xóa đối tượng PostRentDetail
        }
        if (motel != null) {
            try {
                s.delete(motel);
                return true;
            } catch (HibernateException ex) {
                ex.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public boolean restoreMotel(String slug) {
        Session s = this.factory.getObject().getCurrentSession();
        Motel motel = getMotelBySlug(slug);

        if (motel != null) {
            motel.setIsDeleted(false);
            try {
                s.update(motel);
                return true;
            } catch (HibernateException ex) {
                ex.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public List<String> findSlugsStartingWith(String slug) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<String> query = cb.createQuery(String.class);
        Root<Motel> root = query.from(Motel.class);
        query.select(root.get("slug"))
                .where(cb.like(root.get("slug"), slug + "%"));
        return s.createQuery(query).getResultList();
    }

   

}
