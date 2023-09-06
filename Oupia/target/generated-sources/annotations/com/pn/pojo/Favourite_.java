package com.pn.pojo;

import com.pn.pojo.Post;
import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-05T23:06:10", comments="EclipseLink-2.7.10.v20211216-rNA")
=======
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-04T17:45:01", comments="EclipseLink-2.7.10.v20211216-rNA")
>>>>>>> ddaca3f78c3f2f00bcc4741c0248ad7423c3be5c
@StaticMetamodel(Favourite.class)
public class Favourite_ { 

    public static volatile SingularAttribute<Favourite, Date> createdAt;
    public static volatile SingularAttribute<Favourite, Integer> id;
    public static volatile SingularAttribute<Favourite, Post> postId;
    public static volatile SingularAttribute<Favourite, User> userId;

}