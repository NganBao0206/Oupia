/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.pojo;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.Valid;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author yuu
 */
@Entity
@Table(name = "post_rent_detail")
@XmlRootElement
public class PostRentDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @NotNull(message = "{postRentDetail.price.notNull}")
    @DecimalMin(value = "100000.0", inclusive = true, message = "{postRentDetail.price.decimalMin}")
    @DecimalMax(value = "1000000000000.00", inclusive = true, message = "{postRentDetail.price.decimalMax}")
    @Column(name = "price", precision = 15, scale = 2)
    private BigDecimal price;

    @Basic(optional = false)
    @Min(value = 1, message = "{postRentDetail.minPeople.min}")
    @Column(name = "min_people")
    private int minPeople;

    @Basic(optional = false)
    @Min(value = 1, message = "{postRentDetail.maxPeople.min}")
    @Column(name = "max_people")
    private int maxPeople;

    @Basic(optional = false)
    @DecimalMin(value = "0.0", inclusive = false, message = "{postRentDetail.area.decimalMin}")
    @NotNull(message = "{postRentDetail.area.notNull}")
    @Column(name = "area")
    private double area;

    @Column(name = "num_of_bedrooms")
    @Min(value = 1, message = "{postRentDetail.numOfBedrooms.min}")
    private Integer numOfBedrooms;

    @Column(name = "num_of_bathrooms")
    @Min(value = 1, message = "{postRentDetail.numOfBathrooms.min}")
    private Integer numOfBathrooms;

    @JoinColumn(name = "motel_id", referencedColumnName = "id")
    @NotNull(message = "{postRentDetail.motelId.notNull}")
    @Valid
    @ManyToOne(optional = false)
    private Motel motelId;

    @JoinColumn(name = "post_id", referencedColumnName = "id")
    @OneToOne(optional = false)
    @Valid
    private Post postId;

    @Transient
    private MultipartFile[] imgImport;
    
    public PostRentDetail() {
        numOfBedrooms = 1;
        numOfBathrooms = 1;
    }

    public PostRentDetail(Integer id) {
        this.id = id;
    }

    public PostRentDetail(Integer id, BigDecimal price, int minPeople, int maxPeople, double area) {
        this.id = id;
        this.price = price;
        this.minPeople = minPeople;
        this.maxPeople = maxPeople;
        this.area = area;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getMinPeople() {
        return minPeople;
    }

    public void setMinPeople(int minPeople) {
        this.minPeople = minPeople;
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
    
    
    public MultipartFile[] getImgImport() {
        return imgImport;
    }
    public void setImgImport(MultipartFile[] imgImport) {
        this.imgImport = imgImport;
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
        if (!(object instanceof PostRentDetail)) {
            return false;
        }
        PostRentDetail other = (PostRentDetail) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pn.pojo.PostRentDetail[ id=" + id + " ]";
    }

}
