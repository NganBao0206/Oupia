package com.pn.pojo;

import com.pn.pojo.Motel;
import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-04T17:45:01", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(Rate.class)
public class Rate_ { 

    public static volatile SingularAttribute<Rate, Date> createdAt;
    public static volatile SingularAttribute<Rate, Motel> motelId;
    public static volatile SingularAttribute<Rate, Integer> id;
    public static volatile SingularAttribute<Rate, User> userId;
    public static volatile SingularAttribute<Rate, String> rateStars;
    public static volatile SingularAttribute<Rate, String> content;
    public static volatile SingularAttribute<Rate, Date> updatedAt;

}