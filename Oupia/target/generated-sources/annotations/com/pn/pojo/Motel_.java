package com.pn.pojo;

import com.pn.pojo.Image;
import com.pn.pojo.Location;
import com.pn.pojo.PostDetail;
import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-08-09T23:19:31", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(Motel.class)
public class Motel_ { 

    public static volatile SingularAttribute<Motel, Date> createdAt;
    public static volatile SingularAttribute<Motel, String> phoneNumber;
    public static volatile SetAttribute<Motel, Image> imageSet;
    public static volatile SetAttribute<Motel, PostDetail> postDetailSet;
    public static volatile SingularAttribute<Motel, Location> locationId;
    public static volatile SingularAttribute<Motel, String> name;
    public static volatile SingularAttribute<Motel, String> description;
    public static volatile SingularAttribute<Motel, Integer> id;
    public static volatile SingularAttribute<Motel, User> userId;
    public static volatile SingularAttribute<Motel, String> slug;
    public static volatile SingularAttribute<Motel, Date> updatedAt;

}