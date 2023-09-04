import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button, Label, Select } from 'flowbite-react';
import APIs, { endpoints } from '../../../../configs/APIs';
import { UserContext } from '../../../../App';

const StepOneLandlordForm = () => {
    const [currentUser,] = useContext(UserContext);
    const [motels, setMotels] = useState(null);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    useEffect(() => {
        let getMotels = async () => {
            try {
                let res = await APIs.get(endpoints['motels'], {
                    params: {
                        username: currentUser.username,
                        isAccepted: "ACCEPTED",
                        isDelete: 0,
                    }
                });
                if (res.status === 200) {
                    console.log(res.data)
                    setMotels(res.data);
                }

            } catch (err) {
                console.error(err);
            }
        }
        getMotels();
    })

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold leading-7 text-blueTemplate">Chọn phòng trọ</h2>
                <div className="grid grid-cols-8 gap-5">
                    <div className="col-span-6 mt-5">
                        <div className="mb-2 block">
                            <Label htmlFor="motels" value="Chọn nhà trọ" className="text-md"/>
                        </div>
                        <Select id="motels" required                    >
                            {motels && motels.map((motel, index) => (
                                <option key={index} value={motel.id}>{motel.name}</option>
                            ))}
                        </Select>
                    </div>
                    <Button className="bg-blueTemplate mt-auto col-span-2">
                        <Link to="/motels/add" className="flex items-center gap-2" >
                            <MdAdd className="h-5 w-5" color='white' />
                            <p className="font-bold">
                                Thêm phòng
                            </p>
                        </Link>
                    </Button>
                </div>
            </div>

            <ReactMapGL
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
            />
        </div>
    );
};

export default StepOneLandlordForm;