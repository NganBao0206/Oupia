package com.pn.pojo;

import com.pn.pojo.Post;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-08T18:55:20", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(PostFindDetail.class)
public class PostFindDetail_ { 

    public static volatile SingularAttribute<PostFindDetail, Double> minPrice;
    public static volatile SingularAttribute<PostFindDetail, Float> locationLongitude;
    public static volatile SingularAttribute<PostFindDetail, Float> locationLatitude;
    public static volatile SingularAttribute<PostFindDetail, String> location;
    public static volatile SingularAttribute<PostFindDetail, Integer> id;
    public static volatile SingularAttribute<PostFindDetail, Double> maxPrice;
    public static volatile SingularAttribute<PostFindDetail, Post> postId;

}