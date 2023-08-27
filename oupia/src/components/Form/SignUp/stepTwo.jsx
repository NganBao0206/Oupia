import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';

const StepTwo = ({ onInputChange , user}) => {
    const handleInputChange = (event) => {
        const field = event.target.id;
        const value = event.target.value;
        onInputChange(field, value);
    }

    return (
        <div className="w-full">
            <div>
                <div className="mb-2 block">
                    <Label className="text-lg mt-2" htmlFor="fullName" value="Họ tên" />
                </div>
                <TextInput id="fullName" require value={user.fullName} shadow type="text" onChange={handleInputChange}/>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg mt-2" htmlFor="dob" value="Ngày sinh" />
                    </div>
                    <TextInput id="dob" required value={user.dob} shadow type="date" onChange={handleInputChange}/>
                </div>
                <div className="max-w-md" id="select">
                    <div className="mb-2 block">
                        <Label
                            className="text-lg mt-2"
                            htmlFor="gender"
                            value="Giới tính"
                        />
                    </div>
                    <Select id="gender" required onChange={handleInputChange} value={user.gender}>
                        <option selected>--Giới tính--</option>
                        <option value="MALE" >Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </Select>
                </div>
            </div>
            <div className="mt-3">
                <div className="mb-2 block">
                    <Label className="text-lg mt-2" htmlFor="identity" value="Số CMND/ CCCD" />
                </div>
                <TextInput id="identity" required value={user.identity} shadow type="text" onChange={handleInputChange}/>
            </div>
            <div className="mt-3">
                <div className="mb-2 block">
                    <Label className="text-lg mt-2" htmlFor="email" value="Địa chỉ email" />
                </div>
                <TextInput id="email" required value={user.email} shadow type="email" onChange={handleInputChange}/>
            </div>
        </div>
    );
};

export default StepTwo;