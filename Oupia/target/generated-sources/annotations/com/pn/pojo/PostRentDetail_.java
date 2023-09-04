package com.pn.pojo;

import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-04T17:22:08", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(PostRentDetail.class)
public class PostRentDetail_ { 

    public static volatile SingularAttribute<PostRentDetail, Double> area;
    public static volatile SingularAttribute<PostRentDetail, Integer> minPeople;
    public static volatile SingularAttribute<PostRentDetail, BigDecimal> price;
    public static volatile SingularAttribute<PostRentDetail, Motel> motelId;
    public static volatile SingularAttribute<PostRentDetail, Integer> numOfBedrooms;
    public static volatile SingularAttribute<PostRentDetail, Integer> id;
    public static volatile SingularAttribute<PostRentDetail, Integer> maxPeople;
    public static volatile SingularAttribute<PostRentDetail, Post> postId;
    public static volatile SingularAttribute<PostRentDetail, Integer> numOfBathrooms;

}