import { Label, Select, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { FormContext } from '../../../../pages/Register';

const StepTwoRegister = ({context}) => {
    const {user, setUser, errors} = useContext(context);

    const changeUser = (value, field) => {
        setUser(current => {
            return {...current, [field] : value}
        })
    }
    

    return (
        <div className="w-full">
            <div>
                <div className="mb-2 block">
                    <Label className="text-lg mt-2" htmlFor="fullName" value="Họ tên" />
                </div>
                <TextInput id="fullName" name="fullName" value={user.fullName} require shadow type="text" onChange={e => changeUser(e.target.value, e.target.name)}/>
                <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.user.fullName}</p>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg mt-2" htmlFor="dob" value="Ngày sinh" />
                    </div>
                    <TextInput id="dob" name="dob" required value={user.dob} shadow type="date" onChange={e => changeUser(e.target.value, e.target.name)}/>
                    <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.user.dob}</p>
                </div>
                <div className="max-w-md" id="select">
                    <div className="mb-2 block">
                        <Label
                            className="text-lg mt-2"
                            htmlFor="gender"
                            value="Giới tính"
                        />
                    </div>
                    <Select id="gender" name="gender" required value={user.gender} onChange={e => changeUser(e.target.value, e.target.name)}>
                        <option defaultValue>--Giới tính--</option>
                        <option value="MALE" >Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </Select>
                    <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.user.gender}</p>

                </div>
            </div>
            <div className="mt-3">
                <div className="mb-2 block">
                    <Label className="text-lg mt-2" htmlFor="identity" value="Số CMND/ CCCD" />
                </div>
                <TextInput id="identity" name="identityNumber" value={user.identityNumber} required shadow type="text" onChange={e => changeUser(e.target.value, e.target.name)}/>
                <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.user.identityNumber}</p>

            </div>
            <div className="mt-3">
                <div className="mb-2 block">
                    <Label className="text-lg mt-2" htmlFor="email" value="Địa chỉ email" />
                </div>
                <TextInput id="email" name="email" value={user.email} required shadow type="email" onChange={e => changeUser(e.target.value, e.target.name)}/>
                <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.user.email}</p>
            </div>
        </div>
    );
};

export default StepTwoRegister;