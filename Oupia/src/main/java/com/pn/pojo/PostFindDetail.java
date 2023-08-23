/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.pojo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author yuu
 */
@Entity
@Table(name = "post_find_detail")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PostFindDetail.findAll", query = "SELECT p FROM PostFindDetail p"),
    @NamedQuery(name = "PostFindDetail.findById", query = "SELECT p FROM PostFindDetail p WHERE p.id = :id"),
    @NamedQuery(name = "PostFindDetail.findByLocation", query = "SELECT p FROM PostFindDetail p WHERE p.location = :location"),
    @NamedQuery(name = "PostFindDetail.findByMinPrice", query = "SELECT p FROM PostFindDetail p WHERE p.minPrice = :minPrice"),
    @NamedQuery(name = "PostFindDetail.findByMaxPrice", query = "SELECT p FROM PostFindDetail p WHERE p.maxPrice = :maxPrice"),
    @NamedQuery(name = "PostFindDetail.findByPeople", query = "SELECT p FROM PostFindDetail p WHERE p.people = :people")})
public class PostFindDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 150)
    @Column(name = "location")
    private String location;
    @Basic(optional = false)
    @NotNull
    @Column(name = "min_price")
    private double minPrice;
    @Basic(optional = false)
    @NotNull
    @Column(name = "max_price")
    private double maxPrice;
    @Basic(optional = false)
    @NotNull
    @Column(name = "people")
    private int people;
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Post postId;

    public PostFindDetail() {
    }

    public PostFindDetail(Integer id) {
        this.id = id;
    }

    public PostFindDetail(Integer id, String location, double minPrice, double maxPrice, int people) {
        this.id = id;
        this.location = location;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.people = people;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(double minPrice) {
        this.minPrice = minPrice;
    }

    public double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public int getPeople() {
        return people;
    }

    public void setPeople(int people) {
        this.people = people;
    }

    public Post getPostId() {
        return postId;
    }

    public void setPostId(Post postId) {
        this.postId = postId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PostFindDetail)) {
            return false;
        }
        PostFindDetail other = (PostFindDetail) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pn.pojo.PostFindDetail[ id=" + id + " ]";
    }
    
}
