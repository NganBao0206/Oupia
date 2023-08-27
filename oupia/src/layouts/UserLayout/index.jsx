import React, { useState } from 'react';
import "./style.scss";
import { PiUsers } from "react-icons/pi";
import { Button, Card } from 'flowbite-react';
import { MdAlternateEmail } from 'react-icons/md';
import { BsGenderTrans, BsCalendar4, BsClock } from "react-icons/bs";
import { Link, Outlet, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LuEdit, LuHeart } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import UserPhotos from '../../pages/User/photos';
import UserPosts from '../../pages/User/posts';
import UserFavourite from '../../pages/User/favorite';

const UserLayout = (props) => {
    const [component, setComponent] = useState(<UserPosts />);
    const { slugUser } = useParams();

    const handleChangeComponent = (event) => {
        const href = event.currentTarget.getAttribute('href');
        if (href === `/${slugUser}/posts`)
            setComponent(<UserPosts />);
        if (href === `/${slugUser}/favourites`)
            setComponent(<UserFavourite />);
        if (href === `/${slugUser}/photos`)
            setComponent(<UserPhotos />);
    }


    const user = {
        id: "1",
        fullName: "Nguyễn Kim Bảo Ngân",
        username: "ngannguyen",
        gender: "Nữ",
        dob: "02/06/2002",
        follows: "125",
        posts: "46",
        avatar: "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-1/350118519_479477941022130_6544855667418265188_n.jpg?stp=dst-jpg_s320x320&_nc_cat=111&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=i3JyyOmw0B0AX9xslvR&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBYMGvrA3cGTvfGGX_oUXHZRnPQS2sQipFFKhar9TLx9w&oe=64E0EB9D",
    }

    return (
        <>
            <div>
                <div className=" bg-wallpaper bg-Dark">
                    <div className="grid grid-cols-10 gap-2 w-full">
                        <div className=" relative col-span-3">
                            <div className="absolute img-translate-y top-full z-999 left-1/2 w-56 h-56 ring-[5px] ring-white rounded-full shadow-xl">
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full"
                                />
                            </div>
                        </div>
                        <div className="col-span-7">

                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-10 grid-row-2 gap-2">
                    <div className="col-span-3 row-span-2 mx-auto">
                        <Card className="w-96 mt-36 pb-2x`">
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
                                <h3 className=" font-thin">{user.follows}</h3>
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
                    <div className="col-span-7">
                        <div className="flex flex-col pr-48 mt-5 gap-2">
                            <h1 className="text-3xl font-bold text-left">{user.fullName}</h1>
                            <div className="flex">
                                <div className=" flex gap-2 text-gray-500">
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
                        <div className="pr-48">
                            <hr className="mt-10" />
                            <div class="flex text-center flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700">
                                <NavLink to={`/${user.id}/posts`} onClick={(event) => handleChangeComponent(event)} className="flex font-bold items-center justify-center p-4 text-sm first:ml-0 focus:outline-none rounded-t-lg border-b-2 border-transparent text-gray-500">
                                    <LuEdit size="20" className="mr-2" />
                                    <p className="mt-1">Bài viết</p>
                                </NavLink>
                                <NavLink to={`/${user.id}/favourites`} onClick={(event) => handleChangeComponent(event)} className="flex font-bold items-center justify-center p-4 text-sm first:ml-0 focus:outline-none rounded-t-lg border-b-2 border-transparent text-gray-500">
                                    <LuHeart size="20" className="mr-2" />
                                    <p className="mt-1">Yêu thích</p>
                                </NavLink>
                                <NavLink to={`/${user.id}/photos`} onClick={(event) => handleChangeComponent(event)} className="flex font-bold items-center justify-center p-4 text-sm first:ml-0 focus:outline-none rounded-t-lg border-b-2 border-transparent text-gray-500">
                                    <IoImageOutline size="20" className="mr-2" />
                                    <p className="mt-1">Hình ảnh</p>
                                </NavLink>
                            </div>
                            <div>
                                {component}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default UserLayout;