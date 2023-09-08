import { Button, Card, Navbar, Spinner } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import imgLogo from "../../resources/logoOupia.svg";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import APIs, { authApi, endpoints } from '../../configs/APIs';
import cookie from "react-cookies";
import { UserContext } from '../../App';
import "./style.scss";

const Login = () => {
    const [user, dispatch] = useContext(UserContext);
    const [alert, setAlert] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [loading, setLoading] = useState(false);
    const [q] = useSearchParams();
    const login = (evt) => {
        evt.preventDefault();
        setAlert(false);
        setLoading(true);
        const process = async () => {
            try {
                let res = await APIs.post(endpoints['login'], {
                    "username": username,
                    "password": password
                });
                cookie.save("token", res.data);

                let { data } = await authApi().get(endpoints['current-user']);
                cookie.save("user", data);

                dispatch({
                    "type": "login",
                    "payload": data
                });
            } catch (err) {
                console.error(err);
                setLoading(false);
                setAlert(true);
            }
        }
        process();
    }

    if (user !== null) {
        let next = q.get("next") || "/";
        return <Navigate to={next} />
    }

    return (
        <div className="bg-login bg-cover items-center">
            <Card className="w-1/4 border-transparent pb-10 pt-7 shadow-lg">
                <Navbar.Brand className="mx-auto">
                    <img
                        alt="Oupia Logo"
                        className="mr-3 h-7 sm:h-10"
                        src={imgLogo}
                    />
                    <p className="self-center whitespace-nowrap text-3xl text-blueTemplate font-bold dark:text-white">
                        Oupia
                    </p>
                </Navbar.Brand>
                <form onSubmit={login} className="flex flex-col gap-4 mt-8">
                    <div>
                        <div className="relative">
                            <input onChange={e => setUsername(e.target.value)} type="text" id="username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="default_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Tên người dùng</label>
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <input onChange={e => setPassword(e.target.value)} type="password" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="default_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mật khẩu</label>
                        </div>
                    </div>
                    <Link className="ml-auto text-sm italic font-thin text-gray-500">Quên mật khẩu?</Link>
                    <div className="flex justify-center">
                        {loading !== false ?
                            <Spinner
                                size="lg" className="my-2 fill-blueTemplate" />
                            :
                            <Button type="submit" className="bg-blueTemplate w-full">
                                <p className="font-bold text-base">Đăng nhập</p>
                            </Button>
                        }
                    </div>
                    {alert === true ? <h3 className="text-red-600 w-full text-center text-sm">Tài khoản hoặc mật khẩu không đúng</h3> : <></>}
                </form>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">hoặc đăng nhập với</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <Button className="items-center border border-Dark rounded ">
                        <FcGoogle className="mr-2 h-5 w-5" />
                        <p className="text-Dark">
                            Google
                        </p>
                    </Button>
                    <Button className="items-center border border-Dark rounded ">
                        <BsFacebook className="mr-2 h-5 w-5" color='blue' />
                        <p className="text-Dark">
                            Facebook
                        </p>
                    </Button>
                </div>
                <p className="font-thin text-sm mx-auto text-gray-900">Chưa có tài khoản? <Link to="/register" className="font-bold">Đăng ký ngay</Link></p>
            </Card>
        </div>
    );
};

export default Login;