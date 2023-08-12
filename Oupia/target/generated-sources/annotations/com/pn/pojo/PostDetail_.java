package com.pn.pojo;

import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.PostDetailImage;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-08-11T16:09:33", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(PostDetail.class)
public class PostDetail_ { 

    public static volatile SingularAttribute<PostDetail, Double> area;
    public static volatile SetAttribute<PostDetail, PostDetailImage> postDetailImageSet;
    public static volatile SingularAttribute<PostDetail, Double> price;
    public static volatile SingularAttribute<PostDetail, Motel> motelId;
    public static volatile SingularAttribute<PostDetail, Integer> numOfBedrooms;
    public static volatile SingularAttribute<PostDetail, Integer> id;
    public static volatile SingularAttribute<PostDetail, Integer> maxPeople;
    public static volatile SingularAttribute<PostDetail, Post> postId;
    public static volatile SingularAttribute<PostDetail, Integer> numOfBathrooms;

}