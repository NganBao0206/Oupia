package com.pn.pojo;

import com.pn.pojo.Post;
import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-10T22:35:34", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(Favourite.class)
public class Favourite_ { 

    public static volatile SingularAttribute<Favourite, Date> createdAt;
    public static volatile SingularAttribute<Favourite, Integer> id;
    public static volatile SingularAttribute<Favourite, Post> postId;
    public static volatile SingularAttribute<Favourite, User> userId;

}