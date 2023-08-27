import React, { useEffect, useState } from 'react';
import { Label, Select, TextInput } from 'flowbite-react';
import axios from 'axios';
import "./style.scss";

const AreaForm = () => {


    const [provs, setProvs] = useState([]);
    const [dists, setDists] = useState([]);
    const [ws, setWs] = useState([]);


    const handleProvince = async ({ target }) => {
        const selectedProvCode = target.value;
        try {
            const res = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvCode}?depth=2`);
            const resDist = res.data.districts;
            setDists(resDist);
        } catch (ex) {
            console.error('Error fetching districts: ', ex);
        }
    }


    const handleDistrict = async ({ target }) => {
        const selectedDistCode = target.value;
        try {
            const res = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistCode}?depth=2`);
            const resWard = res.data.wards;
            setWs(resWard);
        } catch (ex) {
            console.error('Error fetching districts: ', ex);
        }
    }


    useEffect(() => {
        const getProvince = async () => {
            try {
                const res = await axios.get("https://provinces.open-api.vn/api/?depth=2");
                const resProv = res.data;
                setProvs(await resProv);
            } catch (ex) {
                console.error('Error fetching provinces: ', ex);
            }
        }
        getProvince();
    }, []);

    return (
        <>
            <h2 className="text-2xl"> Thông tin khu vực </h2>
            <div className="grid grid-cols-3 gap-5">
                <div className="max-w-md" id="select">
                    <div className="mb-2 block">
                        <Label htmlFor="province" className="block font-bold mb-1">
                            Tỉnh/Thành phố
                        </Label>
                    </div>
                    <Select id="province" required onChange={handleProvince} defaultValue="">
                        <option value="">
                            --Chọn tỉnh/thành phố--
                        </option>
                        {provs.map((resProv, index) => (
                            <option key={index} value={resProv.code}>
                                {resProv.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="max-w-md" id="select">
                    <div className="mb-2 block">
                        <Label htmlFor="district" className="block font-bold mb-1">
                            Quận/Huyện
                        </Label>
                    </div>
                    <Select id="district" required onChange={handleDistrict} defaultValue="" >
                        <option value="">
                            --Chọn quận/huyện--
                        </option>
                        {dists && dists.map((resDist, index) => (
                            <option key={index} value={resDist.code}>
                                {resDist.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="max-w-md" id="select">
                    <div className="mb-2 block">
                        <Label htmlFor="ward" className="block font-bold mb-1">
                            Phường/Xã
                        </Label>
                    </div>
                    <Select id="ward" required defaultValue="" >
                        <option value="">
                            --Chọn phường/xã--
                        </option>
                        {ws && ws.map((resWard, index) => (
                            <option key={index} value={resWard.code}>
                                {resWard.name}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="address" value="Địa chỉ chi tiết"
                    />
                </div>
                <TextInput id="address" sizing="md" type="text"
                />
            </div>
        </>
    );
};

export default AreaForm;
