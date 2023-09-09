import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';

const ChangeInfo = () => {
    const [currentUser,] = useContext(UserContext);
    const [oldPassword, setOldPassword] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [loading, setLoading] = useState(false);
    const [alertEmpty, setAlertEmpty] = useState(false);
    const [alertWrongPass, setAlertWrongPass] = useState(false);
    const [alertNotEqual, setAlertNotEqual] = useState(false);



    const changePassword = (evt) => {
        evt.preventDefault();
        setAlertEmpty(false);
        setAlertNotEqual(false);
        setAlertWrongPass(false);
        setLoading(true);
        if (oldPassword !== currentUser.password) {
            setAlertWrongPass(true);
            setLoading(false);
            return;
        }
        if (!password || !confirmPass || !oldPassword) {
            setAlertEmpty(true);
            setLoading(false);
            return;
        }
        if (password !== confirmPass) {
            setAlertNotEqual(true);
            setLoading(false);
            return;
        }
        const process = async () => {
            try {
                // let res = await APIs.post(endpoints['change-password'], {
                //     "password": password,
                // });

            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
        process();
    }

    return (
        <div className="rounded-xl p-10 shadow-lg flex flex-col gap-8 border border-gray-200">
            <h1 className="text-2xl font-bold mx-auto">
                Chỉnh sửa thông tin
            </h1>
            <form className="flex flex-col gap-4 mx-44">
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg mt-2" htmlFor="fullName" value="Họ tên" />
                    </div>
                    <TextInput value={currentUser.fullName} id="fullName" name="fullName" shadow type="text" />
                </div>
                <div className="grid grid-cols-2 gap-5 mt-3">
                    <div>
                        <div className="mb-2 block">
                            <Label className="text-lg mt-2" htmlFor="dob" value="Ngày sinh" />
                        </div>
                        <TextInput value={currentUser.dob} id="dob" name="dob" shadow type="date" />
                    </div>
                    <div id="select">
                        <div className="mb-2 block">
                            <Label
                                className="text-lg mt-2"
                                htmlFor="gender"
                                value="Giới tính"
                            />
                        </div>
                        <Select id="gender" name="gender" value={currentUser.gender}>
                            <option defaultValue>--Giới tính--</option>
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
                    <TextInput value={currentUser.identityNumber} id="identity" name="identityNumber" shadow type="text" />
                </div>
                <div className="mt-3">
                    <div className="mb-2 block">
                        <Label className="text-lg mt-2" htmlFor="email" value="Địa chỉ email" />
                    </div>
                    <TextInput value={currentUser.email} id="email" name="email" shadow type="email"  />
                </div>
                <div className="flex justify-center mx-56 mt-4">
                    {loading !== false ?
                        <Spinner
                            size="lg" className="my-2 fill-blueTemplate" />
                        :
                        <Button type="submit" className="bg-blueTemplate w-full">
                            <p className="font-bold text-base">Cập nhật</p>
                        </Button>
                    }
                </div>
                {alertEmpty === true ? <h3 className="text-red-600 w-full text-center text-sm">Dữ liệu không được để trống</h3> : <></>}
                {alertNotEqual === true ? <h3 className="text-red-600 w-full text-center text-sm">Mật khẩu và xác nhận mật khẩu phải giống nhau</h3> : <></>}
                {alertWrongPass === true ? <h3 className="text-red-600 w-full text-center text-sm">Mật khẩu không đúng, vui lòng thử lại</h3> : <></>}

            </form>
        </div>
    );
};

export default ChangeInfo;