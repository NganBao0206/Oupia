/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository.impl;

import com.pn.pojo.Favourite;
import com.pn.pojo.Image;
import com.pn.pojo.Post;
import com.pn.repository.FavouriteRepository;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
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
    public List<Post> getFavouritesOfUser(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        Root<Favourite> root = q.from(Favourite.class);
        Join<Favourite, Post> postJoin = root.join("postId", JoinType.INNER);
        Join<Post, Image> join = postJoin.join("imageSet", JoinType.INNER);

        Subquery<Long> subquery = q.subquery(Long.class);
        Root<Image> subRoot = subquery.from(Image.class);
        subquery.select(b.min(subRoot.get("id")));
        subquery.where(b.equal(subRoot.get("postId"), root.get("postId")));

        List<Predicate> predicates = new ArrayList<>();
        q.multiselect(root.get("postId"), join.get("image"));

        predicates.add(b.in(join.get("id")).value(subquery));

        predicates.add(b.equal(root.get("userId").get("username"), username));

        Query query = s.createQuery(q);
//        String page = params.get("page");

//        if (page != null) {
//            int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));
//            query.setFirstResult((Integer.parseInt(page) - 1) * pageSize);
//            query.setMaxResults(pageSize);
//        }
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

//    @Override
//    public List<Post> getFavouritesOfUser(String username) {
//        Session s = this.factory.getObject().getCurrentSession();
//        Query query = s.createQuery("FROM Favourite WHERE userId.username = :username");
//        query.setParameter("username", username);
//        return (List<Post>) query.getResultList();
//    }
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
