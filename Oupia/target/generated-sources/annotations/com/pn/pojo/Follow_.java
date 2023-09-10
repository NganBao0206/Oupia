package com.pn.pojo;

import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-10T20:47:43", comments="EclipseLink-2.7.10.v20211216-rNA")
=======
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-10T22:22:03", comments="EclipseLink-2.7.10.v20211216-rNA")
>>>>>>> 85994763e870d21730c5872d229b1d75d6a2168c
@StaticMetamodel(Follow.class)
public class Follow_ { 

    public static volatile SingularAttribute<Follow, Date> createdAt;
    public static volatile SingularAttribute<Follow, User> followUserId;
    public static volatile SingularAttribute<Follow, Integer> id;
    public static volatile SingularAttribute<Follow, User> beFollowedUserId;

}