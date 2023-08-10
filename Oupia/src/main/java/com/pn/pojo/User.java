/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.pojo;

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
@NamedQueries({
    @NamedQuery(name = "User.findAll", query = "SELECT u FROM User u"),
    @NamedQuery(name = "User.findById", query = "SELECT u FROM User u WHERE u.id = :id"),
    @NamedQuery(name = "User.findByUsername", query = "SELECT u FROM User u WHERE u.username = :username"),
    @NamedQuery(name = "User.findByPassword", query = "SELECT u FROM User u WHERE u.password = :password"),
    @NamedQuery(name = "User.findByFullName", query = "SELECT u FROM User u WHERE u.fullName = :fullName"),
    @NamedQuery(name = "User.findByEmail", query = "SELECT u FROM User u WHERE u.email = :email"),
    @NamedQuery(name = "User.findByPhoneNumber", query = "SELECT u FROM User u WHERE u.phoneNumber = :phoneNumber"),
    @NamedQuery(name = "User.findByIdentityNumber", query = "SELECT u FROM User u WHERE u.identityNumber = :identityNumber"),
    @NamedQuery(name = "User.findByGender", query = "SELECT u FROM User u WHERE u.gender = :gender"),
    @NamedQuery(name = "User.findByDob", query = "SELECT u FROM User u WHERE u.dob = :dob"),
    @NamedQuery(name = "User.findByCreatedAt", query = "SELECT u FROM User u WHERE u.createdAt = :createdAt"),
    @NamedQuery(name = "User.findByUpdatedAt", query = "SELECT u FROM User u WHERE u.updatedAt = :updatedAt"),
    @NamedQuery(name = "User.findByUserRole", query = "SELECT u FROM User u WHERE u.userRole = :userRole"),
    @NamedQuery(name = "User.findByIsActive", query = "SELECT u FROM User u WHERE u.isActive = :isActive"),
    @NamedQuery(name = "User.findBySlug", query = "SELECT u FROM User u WHERE u.slug = :slug")})
public class User implements Serializable {

    /**
     * @return the file
     */
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

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    
    @Basic(optional = false)
    @NotNull(message = "{user.username.notNull}")
    @Size(min = 1, max = 50, message = "{user.username.size}")
    @Pattern(regexp = "^[a-zA-Z0-9._-]{3,}$", message = "{user.username.pattern}")
    @Column(name = "username")
    private String username;
    
    @Basic(optional = false)
    @NotNull(message = "{user.password.notNull}")
    @Size(min = 8, max = 100,message = "{user.password.size}")
    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\_\\-+=])[A-Za-z\\d!@#$%^&*\\_\\-+=]+$", message = "user.password.pattern")
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
    
    @Size(max = 20)
    @Column(name = "phone_number")
    private String phoneNumber;
    
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
    @Temporal(TemporalType.TIMESTAMP)
    private Date dob;
    
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
    
    @Basic(optional = false)
    @NotNull(message = "{user.userRole.notNull}")
    @Size(min = 1, message = "{user.userRole.notNull}")
    @Column(name = "user_role")
    private String userRole;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "is_active")
    private boolean isActive;
    
    @Lob
    @Size(max = 65535)
    @Column(name = "avatar")
    private String avatar;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "slug")
    private String slug;
    @Transient
    private MultipartFile file;
    @Transient
    private String confirmPassword;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    private Set<Post> postSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "followUserId")
    private Set<Follow> followSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "beFollowedUserId")
    private Set<Follow> followSet1;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sendUserId")
    private Set<Message> messageSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "receiveUserId")
    private Set<Message> messageSet1;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    private Set<Motel> motelSet;

    public User() {
        this.slug = "ok";
    }

    public User(Integer id) {
        this.id = id;
    }

    public User(Integer id, String username, String password, String fullName, String identityNumber, String gender, Date dob, String userRole, boolean isActive, String slug) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.identityNumber = identityNumber;
        this.gender = gender;
        this.dob = dob;
        this.userRole = userRole;
        this.isActive = isActive;
        this.slug = "ok";
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    @XmlTransient
    public Set<Post> getPostSet() {
        return postSet;
    }

    public void setPostSet(Set<Post> postSet) {
        this.postSet = postSet;
    }

    @XmlTransient
    public Set<Follow> getFollowSet() {
        return followSet;
    }

    public void setFollowSet(Set<Follow> followSet) {
        this.followSet = followSet;
    }

    @XmlTransient
    public Set<Follow> getFollowSet1() {
        return followSet1;
    }

    public void setFollowSet1(Set<Follow> followSet1) {
        this.followSet1 = followSet1;
    }

    @XmlTransient
    public Set<Message> getMessageSet() {
        return messageSet;
    }

    public void setMessageSet(Set<Message> messageSet) {
        this.messageSet = messageSet;
    }

    @XmlTransient
    public Set<Message> getMessageSet1() {
        return messageSet1;
    }

    public void setMessageSet1(Set<Message> messageSet1) {
        this.messageSet1 = messageSet1;
    }

    @XmlTransient
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
}
