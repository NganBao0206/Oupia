package com.pn.pojo;

import com.pn.pojo.Motel;
import com.pn.pojo.PostDetailImage;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-08-09T23:19:31", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(Image.class)
public class Image_ { 

    public static volatile SingularAttribute<Image, String> image;
    public static volatile SetAttribute<Image, PostDetailImage> postDetailImageSet;
    public static volatile SingularAttribute<Image, Motel> motelId;
    public static volatile SingularAttribute<Image, String> caption;
    public static volatile SingularAttribute<Image, Integer> id;

}