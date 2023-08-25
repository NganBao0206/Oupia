/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author yuu
 */
@Entity
@Table(name = "post")
@XmlRootElement
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @NotNull(message = "{post.title.notNull}")
    @Size(min = 20, max = 255, message = "{post.title.size}")
    @Column(name = "title")
    private String title;

    @Basic(optional = false)
    @NotNull(message = "{post.description.size}")
    @Lob
    @Size(min = 50, max = 65535, message = "{post.description.size}")
    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Basic(optional = false)
    @Size(min = 1, max = 100)
    @Column(name = "slug")
    private String slug;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postId")
    private Set<Image> imageSet;

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;
    
    @Basic(optional = false)
    @Column(name = "is_deleted")
    private boolean isDeleted;

    @OneToOne(mappedBy = "postId", cascade = CascadeType.ALL)
    private PostRentDetail postRentDetail;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postId")
    private Set<Comment> commentSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postId")
    private Set<Favourite> favouriteSet;
    @OneToOne(mappedBy = "postId", cascade = CascadeType.ALL)
    private PostFindDetail postFindDetail;

    public Post() {
        isDeleted = false;
    }

    public Post(Integer id) {
        this.id = id;
    }

    public Post(Integer id, String title, String description, String slug) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.slug = slug;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    
     public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    @XmlTransient
    public Set<Image> getImageSet() {
        return imageSet;
    }

    public void setImageSet(Set<Image> imageSet) {
        this.imageSet = imageSet;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    @XmlTransient
    public PostRentDetail getPostRentDetail() {
        return postRentDetail;
    }

    public void setPostRentDetail(PostRentDetail postRentDetail) {
        this.postRentDetail = postRentDetail;
    }

    @XmlTransient
    public Set<Comment> getCommentSet() {
        return commentSet;
    }

    public void setCommentSet(Set<Comment> commentSet) {
        this.commentSet = commentSet;
    }

    @XmlTransient
    public Set<Favourite> getFavouriteSet() {
        return favouriteSet;
    }

    public void setFavouriteSet(Set<Favourite> favouriteSet) {
        this.favouriteSet = favouriteSet;
    }

    @XmlTransient
    public PostFindDetail getPostFindDetail() {
        return postFindDetail;
    }

    public void setPostFindDetail(PostFindDetail postFindDetail) {
        this.postFindDetail = postFindDetail;
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
        if (!(object instanceof Post)) {
            return false;
        }
        Post other = (Post) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pn.pojo.Post[ id=" + id + " ]";
    }

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }

}
