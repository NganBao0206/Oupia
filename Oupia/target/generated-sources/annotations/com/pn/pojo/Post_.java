package com.pn.pojo;

import com.pn.pojo.Comment;
import com.pn.pojo.Favourite;
import com.pn.pojo.Image;
import com.pn.pojo.PostFindDetail;
import com.pn.pojo.PostRentDetail;
import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-05T23:06:10", comments="EclipseLink-2.7.10.v20211216-rNA")
=======
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-04T17:45:01", comments="EclipseLink-2.7.10.v20211216-rNA")
>>>>>>> ddaca3f78c3f2f00bcc4741c0248ad7423c3be5c
@StaticMetamodel(Post.class)
public class Post_ { 

    public static volatile SetAttribute<Post, Image> imageSet;
    public static volatile SingularAttribute<Post, PostRentDetail> postRentDetail;
    public static volatile SingularAttribute<Post, PostFindDetail> postFindDetail;
    public static volatile SingularAttribute<Post, String> description;
    public static volatile SingularAttribute<Post, String> title;
    public static volatile SingularAttribute<Post, User> userId;
    public static volatile SingularAttribute<Post, Date> createdAt;
    public static volatile SingularAttribute<Post, Boolean> isDeleted;
    public static volatile SetAttribute<Post, Comment> commentSet;
    public static volatile SingularAttribute<Post, Integer> id;
    public static volatile SetAttribute<Post, Favourite> favouriteSet;
    public static volatile SingularAttribute<Post, String> slug;
    public static volatile SingularAttribute<Post, Date> updatedAt;

}