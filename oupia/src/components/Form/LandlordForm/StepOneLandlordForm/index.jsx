import React, { useContext } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button, Label } from 'flowbite-react';

const StepOneLandlordForm = ({ context }) => {
    const { motels, postRentDetail, setPostRentDetail } = useContext(context);
    const changeMotel = (e) => {
        setPostRentDetail(current => {
            return { ...current, motelId: e.target.value }
        })
        console.log(postRentDetail);
    }
    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold leading-7 text-blueTemplate">Chọn phòng trọ</h2>
                <div className="grid grid-cols-8 gap-5">
                    <div className="col-span-6">
                        <div className="mb-2 block">
                            <Label htmlFor="motels" value="Chọn nhà trọ" className="text-md hidden" />
                        </div>
                        <select id="motels" onChange={(e) => changeMotel(e)} value={postRentDetail.motelId} className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blueTemplate focus:border-blueTemplate"                    >
                            <option selected={!postRentDetail.motelId} disabled >Chọn nhà trọ đăng bài</option>
                            {motels && motels.map((motel, index) => (
                                <option key={index} value={motel.id}>
                                    <div className="p-3">
                                        {motel.name}
                                    </div>
                                </option>
                            ))}
                        </select>
                        <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{!postRentDetail.motelId && 'Bắt buộc chọn trọ'}</p>
                    </div>
                    <Button className={`bg-blueTemplate my-auto col-span-2 ${!postRentDetail.motelId && "mt-2"}`}>
                        <Link to="/motels/add" className="flex items-center gap-2" >
                            <MdAdd className="h-5 w-5" color='white' />
                            <p className="font-bold">
                                Thêm phòng
                            </p>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepOneLandlordForm;