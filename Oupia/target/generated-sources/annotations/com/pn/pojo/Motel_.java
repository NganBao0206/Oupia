package com.pn.pojo;

import com.pn.pojo.Image;
import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-08-19T11:42:41", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(Motel.class)
public class Motel_ { 

    public static volatile SetAttribute<Motel, Image> imageSet;
    public static volatile SingularAttribute<Motel, Float> locationLatitude;
    public static volatile SingularAttribute<Motel, String> description;
    public static volatile SingularAttribute<Motel, User> userId;
    public static volatile SingularAttribute<Motel, Date> createdAt;
    public static volatile SingularAttribute<Motel, String> phoneNumber;
    public static volatile SingularAttribute<Motel, Boolean> isDeleted;
    public static volatile SingularAttribute<Motel, String> fullLocation;
    public static volatile SingularAttribute<Motel, String> name;
    public static volatile SingularAttribute<Motel, Float> locationLongitude;
    public static volatile SingularAttribute<Motel, Integer> id;
    public static volatile SingularAttribute<Motel, String> slug;
    public static volatile SingularAttribute<Motel, Date> updatedAt;
    public static volatile SingularAttribute<Motel, String> status;

}