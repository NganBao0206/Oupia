import React, { useContext, useEffect, useState } from 'react';
import "./style.scss";
import { PiUsers } from "react-icons/pi";
import { Button, Card } from 'flowbite-react';
import { MdAlternateEmail } from 'react-icons/md';
import { BsGenderTrans, BsCalendar4, BsClock } from "react-icons/bs";
import { Link, Outlet, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LuEdit, LuHeart } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import { UserContext } from '../../App';
import APIs, { endpoints } from '../../configs/APIs';

const UserLayout = () => {
    const { slugUser } = useParams();

    const [currentUser, ] = useContext(UserContext);

    const [user, setUser] = useState(null);
    useEffect (() => {
        if (currentUser == null || slugUser !== currentUser.username) {
            const getUser = async () => {
                try {
                    const url = endpoints.userInfo(slugUser);

                    let res = await APIs.get(url);    
                    if (res.status === 200) {
                        setUser(res.data);
                    }
            
                } catch (err) {
                    console.error(err);
                }
            }
            getUser();
        }
        else {
            setUser(currentUser);
        }
    }, [slugUser, currentUser])
    if (user === null) {
        return <>
            đang loading nè
        </>
    }
    return (
        <>
            <div>
                <div className=" bg-wallpaper bg-Dark">
                    <div className="grid grid-cols-10 gap-2 w-full">
                        <div className=" relative md:col-span-3 col-span-10 h-full">
                            <div className="absolute img-translate-y top-full z-999 left-1/2 w-56 h-56 ring-[5px] ring-white rounded-full shadow-xl">
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-7 absolute sm:block">

                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-10 grid-row-2 gap-2">
                    <div className="md:col-span-3 col-span-10 hidden md:block row-span-2 md:mx-16">
                        <Card className="w-full mt-36 pb-2x">
                            <h5 className="tracking-tight text-gray-900 dark:text-white">
                                <p className="text-xl font-bold ">
                                    Giới thiệu
                                </p>
                            </h5>
                            <hr />
                            <div className="flex gap-2">
                                <MdAlternateEmail size="21" />
                                <h3 className=" font-thin">{user.username}</h3>
                            </div>
                            <div className="flex gap-2">
                                <BsGenderTrans size="21" />
                                <h3 className=" font-thin">
                                    {user.gender === "MALE" && 'Nam'}
                                    {user.gender === "FEMALE" && 'Nữ'}
                                    {user.gender === "ORTHER" && 'Khác'}
                                </h3>
                            </div>
                            <div className="flex gap-2">
                                <BsCalendar4 size="21" />
                                <h3 className=" font-thin">{user.dob}</h3>
                            </div>
                            <div className="flex gap-2">
                                <BsClock size="21" />
                                <h3 className=" font-thin">Tham gia vào {user.dob}</h3>
                            </div>

                        </Card>
                    </div>
                    <div className="md:col-span-6 col-span-10 mt-36 md:mt-0">
                        <div className="flex flex-col mt-5 gap-2">
                            <h1 className="text-3xl font-bold text-left">{user.fullName}</h1>
                            <div className="flex">
                                <div className="flex md:w-auto w-full gap-2 text-gray-500">
                                    <PiUsers size="21" />
                                    <h3 className=" font-bold">{user.follows} người theo dõi</h3>
                                    <h3 >•</h3>
                                    <LuEdit size="20" className="text-gray-500" />
                                    <h3 className=" font-bold">{user.posts} bài viết</h3>
                                </div>
                                <div className="ml-auto flex gap-5">
                                    <Button color="dark" className="ring-2 ring-Dark"><p className="font-bold"><Link to="/upload">Đăng tin mới</Link></p></Button>
                                    <Button outline className="ring-2 ring-Dark"><p className="font-bold">Chỉnh sửa thông tin</p></Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <hr className="mt-10" />
                            <div className="flex text-center flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700">
                                <NavLink to={`/${user.username}/posts`} className="flex font-bold items-center justify-center p-4 text-sm first:ml-0 focus:outline-none rounded-t-lg border-b-2 border-transparent text-gray-500">
                                    <LuEdit size="20" className="mr-2" />
                                    <p className="mt-1">Bài viết</p>
                                </NavLink>
                                <NavLink to={`/${user.username}/favourites`} className="flex font-bold items-center justify-center p-4 text-sm first:ml-0 focus:outline-none rounded-t-lg border-b-2 border-transparent text-gray-500">
                                    <LuHeart size="20" className="mr-2" />
                                    <p className="mt-1">Yêu thích</p>
                                </NavLink>
                                <NavLink to={`/${user.username}/photos`} className="flex font-bold items-center justify-center p-4 text-sm first:ml-0 focus:outline-none rounded-t-lg border-b-2 border-transparent text-gray-500">
                                    <IoImageOutline size="20" className="mr-2" />
                                    <p className="mt-1">Hình ảnh</p>
                                </NavLink>
                            </div>
                            <div>
                                <Outlet userRole={user.userRole} />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 hidden md:block"></div>
                </div>
            </div>
        </>
    );
};

export default UserLayout;