import { Button, Spinner } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';

const ChangePassword = () => {
    const [currentUser, ] = useContext(UserContext);
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
                Đổi mật khẩu mới
            </h1>
            <form onSubmit={(evt) => changePassword(evt)} className="flex flex-col gap-8 mx-56">
                <div>
                    <div className="relative">
                        <input value={oldPassword} onChange={(evt) => setOldPassword(evt.target.value)} type="password" id="oldPassword" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blueTemplate focus:outline-none focus:ring-0 focus:border-blueTemplate peer" placeholder=" " />
                        <label htmlFor="default_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blueTemplate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mật khẩu hiện tại</label>
                    </div>
                </div>
                <div>
                    <div className="relative">
                        <input value={password} onChange={(evt) => setPassword(evt.target.value)} type="password" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blueTemplate focus:outline-none focus:ring-0 focus:border-blueTemplate peer" placeholder=" " />
                        <label htmlFor="default_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blueTemplate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mật khẩu mới</label>
                    </div>
                </div>
                <div>
                    <div className="relative">
                        <input value={confirmPass} onChange={(evt) => setConfirmPass(evt.target.value)} type="password" id="confirmPass" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blueTemplate focus:outline-none focus:ring-0 focus:border-blueTemplate peer" placeholder=" " />
                        <label htmlFor="default_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blueTemplate peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Xác thực mật khẩu</label>
                    </div>
                </div>
                <div className="flex justify-center mx-44 mt-4">
                    {loading !== false ?
                        <Spinner
                            size="lg" className="my-2 fill-blueTemplate" />
                        :
                        <Button type="submit" className="bg-blueTemplate w-full">
                            <p className="font-bold text-base">Đổi mật khẩu</p>
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

export default ChangePassword;