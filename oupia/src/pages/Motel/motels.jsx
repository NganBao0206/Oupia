import React, { useEffect, useState } from 'react';
import APIs, { endpoints } from '../../configs/APIs';
import MyBreadCrumb from '../../components/MyBreadCrumb';


const Motels = () => {
    const [motels, setMotels] = useState(null);

    useEffect(() => {
        const loadMotels = async () => {
            try{
                let motels = endpoints['motels'];
                let res = await APIs.get(motels);
                setMotels(res.data);
            } catch(ex){
                console.error(ex);
            }
        }
        loadMotels();
    })

    return (
        <div className="container h-screen my-auto">
          <MyBreadCrumb BreadCrumbName="Phòng trọ" />
            {motels && motels.map( motel => (
                <div>{motel.name}</div>
            ))}
        </div>
    );
};

export default Motels;