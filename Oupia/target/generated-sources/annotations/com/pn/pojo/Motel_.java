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
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-04T14:06:55", comments="EclipseLink-2.7.10.v20211216-rNA")
=======
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-02T12:19:19", comments="EclipseLink-2.7.10.v20211216-rNA")
>>>>>>> 9d73bd5417ff54ea08dfde4aa76ffe173a624fdd
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