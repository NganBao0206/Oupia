/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository.impl;

import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.User;
import com.pn.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author yuumm
 */
@Repository
//@PropertySource("classpath:configs.properties")
@Transactional
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private Environment env;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public List<User> getUsers(Map<String, String> params, List<String> userRoles, List<String> status) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<User> q = b.createQuery(User.class);
        Root root = q.from(User.class);
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
                Predicate pFullName = b.like(root.get("fullName"), String.format("%%%s%%", kw));
                Predicate pUsername = b.like(root.get("username"), String.format("%%%s%%", kw));
                Predicate pEmail = b.like(root.get("email"), String.format("%%%s%%", kw));

                predicates.add(b.or(pFullName, pUsername, pEmail));
            }

            if (userRoles != null && userRoles.size() > 0) {
                List<Predicate> pres = new ArrayList<>();

                for (String role : userRoles) {
                    pres.add(b.equal(root.get("userRole"), role));
                }
                if (pres.size() > 0) {
                    Predicate[] predicateArray = pres.toArray(new Predicate[0]);
                    predicates.add(b.or(predicateArray));
                }
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

            String isConfirm = params.get("isConfirm");
            if (isConfirm != null && !isConfirm.isEmpty()) {
                if (isConfirm.equals("1")) {
                    predicates.add(b.equal(root.get("isConfirm"), true));
                } else if (isConfirm.equals("0")) {
                    predicates.add(b.equal(root.get("isConfirm"), false));
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
    public int countUsers(Map<String, String> params, List<String> userRoles, List<String> status) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Long> q = b.createQuery(Long.class);
        Root<User> root = q.from(User.class);
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
                Predicate pFullName = b.like(root.get("fullName"), String.format("%%%s%%", kw));
                Predicate pUsername = b.like(root.get("username"), String.format("%%%s%%", kw));
                Predicate pEmail = b.like(root.get("email"), String.format("%%%s%%", kw));

                predicates.add(b.or(pFullName, pUsername, pEmail));
            }

            if (userRoles != null && userRoles.size() > 0) {
                List<Predicate> pres = new ArrayList<>();

                for (String role : userRoles) {
                    pres.add(b.equal(root.get("userRole"), role));
                }

                if (pres.size() > 0) {
                    Predicate[] predicateArray = pres.toArray(new Predicate[0]);
                    predicates.add(b.or(predicateArray));
                }
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

            String isConfirm = params.get("isConfirm");
            if (isConfirm != null && !isConfirm.isEmpty()) {
                if (isConfirm.equals("1")) {
                    predicates.add(b.equal(root.get("isConfirm"), true));
                } else if (isConfirm.equals("0")) {
                    predicates.add(b.equal(root.get("isConfirm"), false));
                }
            }

            q.where(predicates.toArray(new Predicate[0]));
        }

        Query query = s.createQuery(q);
        Long count = (Long) query.getSingleResult();
        return count.intValue();
    }

    @Override
    public boolean addOrUpdateUser(User u) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            if (u.getId() == null) {
                s.save(u);
            } else {
                s.update(u);
            }

            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
            System.out.println("casi nayL" + ex.getMessage());
            return false;
        }
    }

    @Override
    public User getUserByUsername(String username) {
        Session session = this.factory.getObject().getCurrentSession();
        Query query = session.createQuery("FROM User u WHERE u.username = :username");
        query.setParameter("username", username);

        try {
            return (User) query.getSingleResult();
        } catch (NoResultException ex) {
            return null; // Trả về null nếu không tìm thấy kết quả
        }
    }

    @Override
    public boolean existsByUsername(String username, int id) {
        Session session = this.factory.getObject().getCurrentSession();
        String queryString = "SELECT COUNT(u) FROM User u WHERE u.username = :username";

        if (id != -1) {
            queryString += " AND u.id != :id";
        }

        Query query = session.createQuery(queryString);

        if (id != -1) {
            query.setParameter("id", id);
        }
        query.setParameter("username", username);
        Long count = (Long) query.getSingleResult();
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteUser(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        User user = getUserByUsername(username);

        if (user != null) {
            user.setIsDeleted(true);
            try {
                s.update(user);
                return true;
            } catch (HibernateException ex) {
                ex.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public boolean destroyUser(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        User user = getUserByUsername(username);

        if (user != null && user.getIsDeleted()) {
            try {
                s.delete(user);
                return true;
            } catch (HibernateException ex) {
                ex.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public boolean restoreUser(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        User user = getUserByUsername(username);

        if (user != null) {
            user.setIsDeleted(false);
            try {
                s.update(user);
                return true;
            } catch (HibernateException ex) {
                ex.printStackTrace();
            }
        }
        return false;
    }
    
    @Override
    public boolean authUser(String username, String password) {
        User  u = this.getUserByUsername(username);
        
        return this.passwordEncoder.matches(password, u.getPassword());
    }

//    @Override
//    public User getUserByUsername(String username) {
//        Session session = this.factory.getObject().getCurrentSession();
//        Query query = session.createQuery("FROM User u WHERE u.username = :username");
//        query.setParameter("username", username);
//        return (User) query.getSingleResult();
//    }

}
