package com.pn.pojo;

import com.pn.pojo.Comment;
import com.pn.pojo.Favourite;
import com.pn.pojo.Follow;
import com.pn.pojo.Message;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.Rate;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-02T00:19:29", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SingularAttribute<User, String> gender;
    public static volatile SetAttribute<User, Message> sentMessageSet;
    public static volatile SingularAttribute<User, String> fullName;
    public static volatile SingularAttribute<User, String> avatar;
    public static volatile SetAttribute<User, Post> postSet;
    public static volatile SetAttribute<User, Motel> motelSet;
    public static volatile SingularAttribute<User, Date> createdAt;
    public static volatile SingularAttribute<User, String> password;
    public static volatile SingularAttribute<User, Boolean> isDeleted;
    public static volatile SetAttribute<User, Comment> commentSet;
    public static volatile SingularAttribute<User, Boolean> isConfirm;
    public static volatile SingularAttribute<User, String> identityNumber;
    public static volatile SetAttribute<User, Message> receivedMessageSet;
    public static volatile SingularAttribute<User, Date> dob;
    public static volatile SingularAttribute<User, Integer> id;
    public static volatile SetAttribute<User, Follow> followUserSet;
    public static volatile SetAttribute<User, Rate> rateSet;
    public static volatile SingularAttribute<User, String> userRole;
    public static volatile SetAttribute<User, Favourite> favouriteSet;
    public static volatile SingularAttribute<User, String> email;
    public static volatile SingularAttribute<User, Date> updatedAt;
    public static volatile SingularAttribute<User, String> username;
    public static volatile SetAttribute<User, Follow> beFollowUserSet;
    public static volatile SingularAttribute<User, String> status;

}