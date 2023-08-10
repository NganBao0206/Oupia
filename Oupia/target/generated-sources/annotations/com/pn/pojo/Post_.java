package com.pn.pojo;

import com.pn.pojo.Comment;
import com.pn.pojo.PostDetail;
import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-08-09T23:19:31", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(Post.class)
public class Post_ { 

    public static volatile SingularAttribute<Post, Date> createdAt;
    public static volatile SetAttribute<Post, Comment> commentSet;
    public static volatile SetAttribute<Post, PostDetail> postDetailSet;
    public static volatile SingularAttribute<Post, String> description;
    public static volatile SingularAttribute<Post, Integer> id;
    public static volatile SingularAttribute<Post, String> title;
    public static volatile SingularAttribute<Post, User> userId;
    public static volatile SingularAttribute<Post, String> slug;
    public static volatile SingularAttribute<Post, Date> updatedAt;

}