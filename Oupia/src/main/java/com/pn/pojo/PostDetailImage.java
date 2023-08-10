/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.pojo;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author yuumm
 */
@Entity
@Table(name = "post_detail_image")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PostDetailImage.findAll", query = "SELECT p FROM PostDetailImage p"),
    @NamedQuery(name = "PostDetailImage.findById", query = "SELECT p FROM PostDetailImage p WHERE p.id = :id"),
    @NamedQuery(name = "PostDetailImage.findByCreatedAt", query = "SELECT p FROM PostDetailImage p WHERE p.createdAt = :createdAt")})
public class PostDetailImage implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Image imageId;
    @JoinColumn(name = "post_detail_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private PostDetail postDetailId;

    public PostDetailImage() {
    }

    public PostDetailImage(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Image getImageId() {
        return imageId;
    }

    public void setImageId(Image imageId) {
        this.imageId = imageId;
    }

    public PostDetail getPostDetailId() {
        return postDetailId;
    }

    public void setPostDetailId(PostDetail postDetailId) {
        this.postDetailId = postDetailId;
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
        if (!(object instanceof PostDetailImage)) {
            return false;
        }
        PostDetailImage other = (PostDetailImage) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pn.pojo.PostDetailImage[ id=" + id + " ]";
    }
    
}
