/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository.impl;

import com.pn.pojo.User;
import com.pn.repository.StatRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author genji
 */
@Repository
@Transactional
public class StatRepositoryImpl implements StatRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public Map<Integer, List<Object[]>> statUserByMonth(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        Root<User> root = q.from(User.class);

        Expression<String> userRole = root.get("userRole");
        Expression<Integer> month = b.function("MONTH", Integer.class, root.get("createdAt"));
        Expression<Long> count = b.count(root);

        Predicate rolePredicate = b.or(b.equal(userRole, "TENANT"), b.equal(userRole, "LANDLORD"));

        String selectedYear = params.get("year");
        if (selectedYear != null && !selectedYear.isEmpty()) {
            Integer yearValue = Integer.parseInt(selectedYear);
            Predicate yearPredicate = b.equal(b.function("YEAR", Integer.class, root.get("createdAt")), yearValue);
            q.where(rolePredicate, yearPredicate);
        } else {
            q.where(rolePredicate);
        }

        q.multiselect(month, userRole, count);
        q.groupBy(month, userRole);

        Query query = s.createQuery(q);
        List<Object[]> data = query.getResultList();
        Map<Integer, List<Object[]>> resultMap = new HashMap<>();

        for (Object[] record : data) {
            Integer m = (Integer) record[0];
            List<Object[]> monthData = resultMap.getOrDefault(m, new ArrayList<>());
            monthData.add(record);
            resultMap.put(m, monthData);
        }

        return resultMap;
    }

    @Override
    public Map<Integer, List<Object[]>> statUserByQuarter(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        Root<User> root = q.from(User.class);

        Expression<String> userRole = root.get("userRole");
        Expression<Integer> quarter = b.function("QUARTER", Integer.class, root.get("createdAt"));
        Expression<Long> count = b.count(root);

        Predicate rolePredicate = b.or(b.equal(userRole, "TENANT"), b.equal(userRole, "LANDLORD"));

        String selectedYear = params.get("year");
        if (selectedYear != null && !selectedYear.isEmpty()) {
            Integer yearValue = Integer.parseInt(selectedYear);
            Predicate yearPredicate = b.equal(b.function("YEAR", Integer.class, root.get("createdAt")), yearValue);
            q.where(rolePredicate, yearPredicate);
        } else {
            q.where(rolePredicate);
        }

        q.multiselect(quarter, userRole, count);
        q.groupBy(quarter, userRole);

        Query query = s.createQuery(q);
        List<Object[]> data = query.getResultList();
        Map<Integer, List<Object[]>> resultMap = new HashMap<>();

        for (Object[] record : data) {
            Integer qt = (Integer) record[0];
            List<Object[]> quarterData = resultMap.getOrDefault(qt, new ArrayList<>());
            quarterData.add(record);
            resultMap.put(qt, quarterData);
        }

        return resultMap;
    }

    @Override
    public Map<Integer, List<Object[]>> statUserByYear() {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        Root<User> root = q.from(User.class);

        Expression<String> userRole = root.get("userRole");
        Expression<Integer> year = b.function("YEAR", Integer.class, root.get("createdAt"));
        Expression<Long> count = b.count(root);

        Predicate rolePredicate = b.or(b.equal(userRole, "TENANT"), b.equal(userRole, "LANDLORD"));

        q.multiselect(year, userRole, count);
        q.where(rolePredicate);
        q.groupBy(year, userRole);

        Query query = s.createQuery(q);
        List<Object[]> data = query.getResultList();
        Map<Integer, List<Object[]>> resultMap = new HashMap<>();

        for (Object[] record : data) {
            Integer y = (Integer) record[0];
            List<Object[]> yearData = resultMap.getOrDefault(y, new ArrayList<>());
            yearData.add(record);
            resultMap.put(y, yearData);
        }

        return resultMap;
    }
}
