/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.pojo;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author yuumm
 */
@Entity
@Table(name = "post_detail")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PostDetail.findAll", query = "SELECT p FROM PostDetail p"),
    @NamedQuery(name = "PostDetail.findById", query = "SELECT p FROM PostDetail p WHERE p.id = :id"),
    @NamedQuery(name = "PostDetail.findByPrice", query = "SELECT p FROM PostDetail p WHERE p.price = :price"),
    @NamedQuery(name = "PostDetail.findByMaxPeople", query = "SELECT p FROM PostDetail p WHERE p.maxPeople = :maxPeople"),
    @NamedQuery(name = "PostDetail.findByArea", query = "SELECT p FROM PostDetail p WHERE p.area = :area"),
    @NamedQuery(name = "PostDetail.findByNumOfBedrooms", query = "SELECT p FROM PostDetail p WHERE p.numOfBedrooms = :numOfBedrooms"),
    @NamedQuery(name = "PostDetail.findByNumOfBathrooms", query = "SELECT p FROM PostDetail p WHERE p.numOfBathrooms = :numOfBathrooms")})
public class PostDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private double price;
    @Basic(optional = false)
    @NotNull
    @Column(name = "max_people")
    private int maxPeople;
    @Basic(optional = false)
    @NotNull
    @Column(name = "area")
    private double area;
    @Column(name = "num_of_bedrooms")
    private Integer numOfBedrooms;
    @Column(name = "num_of_bathrooms")
    private Integer numOfBathrooms;
    @JoinColumn(name = "motel_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Motel motelId;
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Post postId;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postDetailId")
    private Set<PostDetailImage> postDetailImageSet;

    public PostDetail() {
    }

    public PostDetail(Integer id) {
        this.id = id;
    }

    public PostDetail(Integer id, double price, int maxPeople, double area) {
        this.id = id;
        this.price = price;
        this.maxPeople = maxPeople;
        this.area = area;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(int maxPeople) {
        this.maxPeople = maxPeople;
    }

    public double getArea() {
        return area;
    }

    public void setArea(double area) {
        this.area = area;
    }

    public Integer getNumOfBedrooms() {
        return numOfBedrooms;
    }

    public void setNumOfBedrooms(Integer numOfBedrooms) {
        this.numOfBedrooms = numOfBedrooms;
    }

    public Integer getNumOfBathrooms() {
        return numOfBathrooms;
    }

    public void setNumOfBathrooms(Integer numOfBathrooms) {
        this.numOfBathrooms = numOfBathrooms;
    }

    public Motel getMotelId() {
        return motelId;
    }

    public void setMotelId(Motel motelId) {
        this.motelId = motelId;
    }

    public Post getPostId() {
        return postId;
    }

    public void setPostId(Post postId) {
        this.postId = postId;
    }

    @XmlTransient
    public Set<PostDetailImage> getPostDetailImageSet() {
        return postDetailImageSet;
    }

    public void setPostDetailImageSet(Set<PostDetailImage> postDetailImageSet) {
        this.postDetailImageSet = postDetailImageSet;
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
        if (!(object instanceof PostDetail)) {
            return false;
        }
        PostDetail other = (PostDetail) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pn.pojo.PostDetail[ id=" + id + " ]";
    }
    
}
