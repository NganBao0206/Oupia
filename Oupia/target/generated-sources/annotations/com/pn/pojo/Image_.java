package com.pn.pojo;

import com.pn.pojo.Post;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-10T20:47:43", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(Image.class)
public class Image_ { 

    public static volatile SingularAttribute<Image, String> image;
    public static volatile SingularAttribute<Image, Integer> id;
    public static volatile SingularAttribute<Image, Post> postId;

}