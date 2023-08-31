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
import java.util.HashSet;
import java.util.LinkedHashSet;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;

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
    public List<Post> getPosts(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        Root<Post> root = q.from(Post.class);
        Join<Post, Image> join = root.join("imageSet", JoinType.LEFT);
        q.multiselect(root, join.get("image"));

        Float lng = null;
        Float lat = null;
        Expression<Double> distance = null;
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
                Predicate namePredicate = b.like(root.get("title"), "%" + kw + "%");
                predicates.add(namePredicate);
            }

            String type = params.get("type");
            if (type != null && !type.isEmpty()) {
                if (type.equals("tenantPost")) {
                    predicates.add(b.isNotNull(root.get("postFindDetail").get("id")));
                } else if (type.equals("landlordPost")) {
                    predicates.add(b.isNotNull(root.get("postRentDetail").get("id")));
                }
            }

            String isAccepted = params.get("isAccepted");
            if (isAccepted != null && !isAccepted.isEmpty()) {
                if (isAccepted.equals("accepted")) {
                    predicates.add(b.and(b.isNotNull(root.get("postRentDetail").get("id")), b.equal(root.get("postRentDetail").get("motelId").get("status"), "ACCEPTED")));
                }
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

            String longitude = params.get("longitude");
            String latitude = params.get("latitude");
            if (longitude != null && !longitude.isEmpty() && latitude != null && !latitude.isEmpty())
            try {
                lng = Float.valueOf(longitude);
                lat = Float.valueOf(latitude);
                distance = b.function("getDistance", Double.class, root.get("postRentDetail").get("motelId").get("locationLatitude"), root.get("postRentDetail").get("motelId").get("locationLongitude"), b.literal(lat), b.literal(lng));
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
            }

            q.where(predicates.toArray(Predicate[]::new));
        }
        if (lng != null && lat != null && distance != null) {
            q.groupBy(root.get("id"), join.get("id"), root.get("postRentDetail").get("motelId").get("id"));
            q.orderBy(b.asc(distance), b.desc(root.get("id")));
        } else {
            q.groupBy(root.get("id"), join.get("id"));

            q.orderBy(b.desc(root.get("id")));
        }
        Query query = s.createQuery(q);
        String page = params.get("page");

        if (page != null) {
            int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));
            query.setFirstResult((Integer.parseInt(page) - 1) * pageSize);
            query.setMaxResults(pageSize);
        }

        List<Object[]> results = query.getResultList();

        Set<Post> posts = new LinkedHashSet<>();
        for (Object[] result : results) {
            Post post = (Post) result[0];
            String image = (String) result[1];
            if (image != null) {
                post.setImage(image);
            }
            posts.add(post);
        }
        List<Post> postList = new ArrayList<>();
        postList.addAll(posts);
        return postList;
    }

    @Override
    public int countPosts(Map<String, String> params) {
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
                Predicate namePredicate = b.like(root.get("title"), "%" + kw + "%");
                predicates.add(namePredicate);
            }

            String type = params.get("type");
            if (type != null && !type.isEmpty()) {
                if (type.equals("tenantPost")) {
                    predicates.add(b.isNotNull(root.get("postFindDetail").get("id")));
                } else if (type.equals("landlordPost")) {
                    predicates.add(b.isNotNull(root.get("postRentDetail").get("id")));
                }
            }

            String isAccepted = params.get("isAccepted");
            if (isAccepted != null && !isAccepted.isEmpty()) {
                if (isAccepted.equals("accepted")) {
                    predicates.add(b.and(b.isNotNull(root.get("postRentDetail").get("id")), b.equal(root.get("postRentDetail").get("motelId").get("status"), "ACCEPTED")));
                }
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

    public boolean updateThumbnailForPost(int postId, int thumbnailImageId) {
        try {
            Session s = this.factory.getObject().getCurrentSession();

            String hql = "UPDATE Post p SET p.thumbnailId.id = :thumbnailImageId WHERE p.id = :postId";
            Query query = s.createQuery(hql);
            query.setParameter("thumbnailImageId", thumbnailImageId);
            query.setParameter("postId", postId);

            int updatedRows = query.executeUpdate();

            return updatedRows > 0;
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

        if (post != null) {
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

    @Override
    public List<String> findSlugsStartingWith(String slug) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<String> query = cb.createQuery(String.class);
        Root<Post> root = query.from(Post.class);
        query.select(root.get("slug"))
                .where(cb.like(root.get("slug"), slug + "%"));
        return s.createQuery(query).getResultList();
    }
}