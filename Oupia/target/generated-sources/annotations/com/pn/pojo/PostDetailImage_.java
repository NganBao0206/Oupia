package com.pn.pojo;

import com.pn.pojo.Image;
import com.pn.pojo.PostDetail;
import java.util.Date;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-08-09T23:19:31", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(PostDetailImage.class)
public class PostDetailImage_ { 

    public static volatile SingularAttribute<PostDetailImage, Date> createdAt;
    public static volatile SingularAttribute<PostDetailImage, Image> imageId;
    public static volatile SingularAttribute<PostDetailImage, Integer> id;
    public static volatile SingularAttribute<PostDetailImage, PostDetail> postDetailId;

}