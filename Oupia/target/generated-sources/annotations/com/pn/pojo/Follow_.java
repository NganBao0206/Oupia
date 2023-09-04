package com.pn.pojo;

import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-04T14:06:55", comments="EclipseLink-2.7.10.v20211216-rNA")
=======
@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-09-02T12:19:19", comments="EclipseLink-2.7.10.v20211216-rNA")
>>>>>>> 9d73bd5417ff54ea08dfde4aa76ffe173a624fdd
@StaticMetamodel(Follow.class)
public class Follow_ { 

    public static volatile SingularAttribute<Follow, Date> createdAt;
    public static volatile SingularAttribute<Follow, User> followUserId;
    public static volatile SingularAttribute<Follow, Integer> id;
    public static volatile SingularAttribute<Follow, User> beFollowedUserId;

}