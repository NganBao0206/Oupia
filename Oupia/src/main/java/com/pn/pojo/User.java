/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pn.enums.Status;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
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
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author yuumm
 */
@Entity
@Table(name = "user")
@XmlRootElement
public class User implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "is_deleted")
    private boolean isDeleted;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<Rate> rateSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<Comment> commentSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<Favourite> favouriteSet;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @NotNull(message = "{user.username.notNull}")
    @Size(min = 3, max = 50, message = "{user.username.size}")
    @Pattern(regexp = "^[a-zA-Z0-9.]{3,}$", message = "{user.username.pattern}")
    @Column(name = "username")
    private String username;

    @Basic(optional = false)
    @NotNull(message = "{user.password.notNull}")
    @Size(min = 8, max = 100, message = "{user.password.size}")
    @Column(name = "password")
    private String password;

    @Basic(optional = false)
    @NotNull(message = "{user.fullName.notNull}")
    @Size(min = 1, max = 50, message = "{user.fullName.size}")
    @Column(name = "full_name")
    private String fullName;

//    @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 100)
    @Column(name = "email")
    private String email;

    @Basic(optional = false)
    @NotNull(message = "{user.identityNumber.notNull}")
    @Size(min = 1, max = 100, message = "{user.identityNumber.size}")
    @Column(name = "identity_number")
    private String identityNumber;

    @Basic(optional = false)
    @NotNull(message = "{user.gender.notNull}")
    @Size(min = 1, message = "{user.gender.notNull}")
    @Column(name = "gender")
    private String gender;

    @Basic(optional = false)
    @NotNull(message = "{user.dob.notNull}")
    @Column(name = "dob")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dob;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Basic(optional = false)
    @NotNull(message = "{user.userRole.notNull}")
    @Size(min = 1, message = "{user.userRole.notNull}")
    @Column(name = "user_role")
    private String userRole;

    @Basic(optional = false)
    @NotNull
    @Column(name = "is_confirm")
    private boolean isConfirm;

    @Lob
    @Size(max = 65535)
    @Column(name = "avatar")
    private String avatar;

    @Transient
    @JsonIgnore
    @XmlTransient
    private MultipartFile file;

    @Transient
    @JsonIgnore
//    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\_\\-+=])[A-Za-z\\d!@#$%^&*\\_\\-+=]+$", message = "user.password.pattern")
    private String oldPassword;

    @Transient
    @JsonIgnore
    private String confirmPassword;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<Post> postSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "followUserId")
    @JsonIgnore
    private Set<Follow> followUserSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "beFollowedUserId")
    @JsonIgnore
    private Set<Follow> beFollowUserSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sendUserId")
    @JsonIgnore
    private Set<Message> sentMessageSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "receiveUserId")
    @JsonIgnore
    private Set<Message> receivedMessageSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<Motel> motelSet;

    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    public User() {
        isDeleted = false;
        status = Status.PENDING.toString();
    }

    public User(Integer id) {
        this.id = id;
    }

    public User(Integer id, String username, String password, String fullName, String identityNumber, String gender, Date dob, String userRole, String slug) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.oldPassword = password;
        this.confirmPassword = password;
        this.fullName = fullName;
        this.identityNumber = identityNumber;
        this.gender = gender;
        this.dob = dob;
        this.userRole = userRole;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
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

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public boolean getIsConfirm() {
        return isConfirm;
    }

    public void setIsConfirm(boolean isConfirm) {
        this.isConfirm = isConfirm;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the oldPassword
     */
    public String getOldPassword() {
        return oldPassword;
    }

    /**
     * @param oldPassword the oldPassword to set
     */
    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    /**
     * @return the file
     */
    @XmlTransient
    public MultipartFile getFile() {
        return file;
    }

    /**
     * @param file the file to set
     */
    public void setFile(MultipartFile file) {
        this.file = file;
    }

    /**
     * @return the confirmPassword
     */
    public String getConfirmPassword() {
        return confirmPassword;
    }

    /**
     * @param confirmPassword the confirmPassword to set
     */
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    @XmlTransient
    @JsonIgnore

    public Set<Post> getPostSet() {
        return postSet;
    }

    public void setPostSet(Set<Post> postSet) {
        this.postSet = postSet;
    }

    @XmlTransient
    @JsonIgnore

    public Set<Follow> getFollowUserSet() {
        return followUserSet;
    }

    public void setFollowUserSet(Set<Follow> followUserSet) {
        this.followUserSet = followUserSet;
    }

    @XmlTransient
    @JsonIgnore

    public Set<Follow> getBeFollowUserSet() {
        return beFollowUserSet;
    }

    public void setBeFollowUserSet(Set<Follow> beFollowUserSet) {
        this.beFollowUserSet = beFollowUserSet;
    }

    @XmlTransient
    @JsonIgnore

    public Set<Message> getSentMessageSet() {
        return sentMessageSet;
    }

    public void setSentMessageSet(Set<Message> sentMessageSet) {
        this.sentMessageSet = sentMessageSet;
    }

    @XmlTransient
    @JsonIgnore
    public Set<Message> getReceiverMessageSet() {
        return receivedMessageSet;
    }

    public void setReceiverMessageSet(Set<Message> receivedMessageSet) {
        this.receivedMessageSet = receivedMessageSet;
    }

    @XmlTransient
    @JsonIgnore
    public Set<Motel> getMotelSet() {
        return motelSet;
    }

    public void setMotelSet(Set<Motel> motelSet) {
        this.motelSet = motelSet;
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
        if (!(object instanceof User)) {
            return false;
        }
        User other = (User) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pn.pojo.User[ id=" + id + " ]";
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

    @XmlTransient
    @JsonIgnore

    public Set<Rate> getRateSet() {
        return rateSet;
    }

    public void setRateSet(Set<Rate> rateSet) {
        this.rateSet = rateSet;
    }

    @XmlTransient
    @JsonIgnore

    public Set<Comment> getCommentSet() {
        return commentSet;
    }

    public void setCommentSet(Set<Comment> commentSet) {
        this.commentSet = commentSet;
    }

    @XmlTransient
    @JsonIgnore

    public Set<Favourite> getFavouriteSet() {
        return favouriteSet;
    }

    public void setFavouriteSet(Set<Favourite> favouriteSet) {
        this.favouriteSet = favouriteSet;
    }
}
