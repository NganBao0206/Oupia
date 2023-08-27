package com.pn.pojo;

import com.pn.pojo.User;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-08-27T23:55:52", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(Message.class)
public class Message_ { 

    public static volatile SingularAttribute<Message, User> sendUserId;
    public static volatile SingularAttribute<Message, Date> createdAt;
    public static volatile SingularAttribute<Message, User> receiveUserId;
    public static volatile SingularAttribute<Message, String> messageType;
    public static volatile SingularAttribute<Message, Integer> id;
    public static volatile SingularAttribute<Message, String> content;

}