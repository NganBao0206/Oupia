/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.pojo;

import com.pn.enums.Status;
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
@Table(name = "motel")
@XmlRootElement
public class Motel implements Serializable {

    

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @NotNull(message = "{motel.name.notNull}")
    @Size(min = 10, max = 100, message = "{motel.name.size}")
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @NotNull(message = "{motel.description.notNull}")
    @Lob
    @Size(min = 50, max = 65535, message = "{motel.description.size}")
    @Column(name = "description")
    private String description;

    @Basic(optional = false)
    @NotNull(message = "{motel.fullLocation.notNull}")
    @Size(min = 10, max = 150, message = "{motel.fullLocation.size}")
    @Column(name = "full_location")
    private String fullLocation;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Basic(optional = false)
    @Column(name = "slug")
    private String slug;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Basic(optional = false)
    @NotNull
    @Size(min = 10, max = 10, message = "{motel.phoneNumber.size}")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Basic(optional = false)
    @NotNull(message = "{motel.latitudeLongitude.notNull}")
    @Column(name = "location_longitude")
    private float locationLongitude;

    @Basic(optional = false)
    @NotNull(message = "{motel.latitudeLongitude.notNull}")
    @Column(name = "location_latitude")
    private float locationLatitude;

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @NotNull(message = "{motel.userId.notNull}")
    @ManyToOne(optional = false)
    private User userId;

    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "motelId")
    private Set<Image> imageSet;

    @Transient
    private List<String> imgGoogle;
    
    @Transient
    private String image;
    
    /**
     * @return the image
     */
    public String getImage() {
        return image;
    }

    /**
     * @param image the image to set
     */
    public void setImage(String image) {
        this.image = image;
    }

    /**
     * @return the imgImport
     */
    public MultipartFile[] getImgImport() {
        return imgImport;
    }

    /**
     * @param imgImport the imgImport to set
     */
    public void setImgImport(MultipartFile[] imgImport) {
        this.imgImport = imgImport;
    }

    @Transient
    private MultipartFile[] imgImport;

    public Motel() {
        this.isDeleted = false;
        this.status = Status.PENDING.toString();
    }

    public Motel(Integer id) {
        this.id = id;
    }

    public Motel(Integer id, String name, String description, String fullLocation, String slug, String phoneNumber, float locationLongitude, float locationLatitude) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.fullLocation = fullLocation;
        this.slug = slug;
        this.phoneNumber = phoneNumber;
        this.locationLongitude = locationLongitude;
        this.locationLatitude = locationLatitude;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFullLocation() {
        return fullLocation;
    }

    public void setFullLocation(String fullLocation) {
        this.fullLocation = fullLocation;
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

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public float getLocationLongitude() {
        return locationLongitude;
    }

    public void setLocationLongitude(float locationLongitude) {
        this.locationLongitude = locationLongitude;
    }

    public float getLocationLatitude() {
        return locationLatitude;
    }

    public void setLocationLatitude(float locationLatitude) {
        this.locationLatitude = locationLatitude;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public List<String> getImgGoogle() {
        return imgGoogle;
    }

    public void setImgGoogle(List<String> imgGoogle) {
        this.imgGoogle = imgGoogle;
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
        if (!(object instanceof Motel)) {
            return false;
        }
        Motel other = (Motel) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pn.pojo.Motel[ id=" + id + " ]";
    }

    @XmlTransient
    public Set<Image> getImageSet() {
        return imageSet;
    }

    public void setImageSet(Set<Image> imageSet) {
        this.imageSet = imageSet;
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
