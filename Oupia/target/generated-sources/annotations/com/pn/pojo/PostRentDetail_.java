package com.pn.pojo;

import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-04T14:06:55", comments="EclipseLink-2.7.10.v20211216-rNA")
=======
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-02T12:19:19", comments="EclipseLink-2.7.10.v20211216-rNA")
>>>>>>> 9d73bd5417ff54ea08dfde4aa76ffe173a624fdd
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