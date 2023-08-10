package com.pn.pojo;

import com.pn.pojo.Motel;
import javax.annotation.processing.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor", date="2023-08-09T23:19:31", comments="EclipseLink-2.7.10.v20211216-rNA")
@StaticMetamodel(Location.class)
public class Location_ { 

    public static volatile SingularAttribute<Location, String> latitude;
    public static volatile SingularAttribute<Location, Integer> id;
    public static volatile SetAttribute<Location, Motel> motelSet;
    public static volatile SingularAttribute<Location, String> longitude;

}