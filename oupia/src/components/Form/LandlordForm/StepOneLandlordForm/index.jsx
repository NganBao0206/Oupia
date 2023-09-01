import React, { useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const StepOneLandlordForm = () => {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold leading-7 text-blueTemplate">Chọn phòng trọ</h2>
                <div className="flex gap-5">
                    <div className="w-1/3">
                        <label htmlFor="motels" className="block leading-6 text-gray-900 mt-5">Tên nhà trọ</label>
                        <div className="mt-2">
                            <select id="motels" name="motels" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            </select>
                        </div>
                    </div>
                    <Button className="bg-blueTemplate mt-auto" size="sm">
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