package com.pn.pojo;

import com.pn.pojo.PostRentDetail;
import com.pn.pojo.Rate;
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
@StaticMetamodel(Motel.class)
public class Motel_ { 

    public static volatile SingularAttribute<Motel, Float> locationLatitude;
    public static volatile SetAttribute<Motel, PostRentDetail> postRentDetailSet;
    public static volatile SingularAttribute<Motel, User> userId;
    public static volatile SingularAttribute<Motel, Date> createdAt;
    public static volatile SingularAttribute<Motel, String> phoneNumber;
    public static volatile SingularAttribute<Motel, Boolean> isDeleted;
    public static volatile SingularAttribute<Motel, String> fullLocation;
    public static volatile SingularAttribute<Motel, String> name;
    public static volatile SingularAttribute<Motel, Float> locationLongitude;
    public static volatile SingularAttribute<Motel, Integer> id;
    public static volatile SetAttribute<Motel, Rate> rateSet;
    public static volatile SingularAttribute<Motel, String> slug;
    public static volatile SingularAttribute<Motel, Date> updatedAt;
    public static volatile SingularAttribute<Motel, String> status;

}