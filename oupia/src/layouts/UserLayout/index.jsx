import React, { useContext, useEffect, useState } from 'react';
import "./style.scss";
import { PiUsers } from "react-icons/pi";
import { Button, Card } from 'flowbite-react';
import { MdAlternateEmail } from 'react-icons/md';
import { BsCalendar4, BsClock, BsGenderAmbiguous } from "react-icons/bs";
import { Link, Outlet, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LuEdit, LuHeart } from "react-icons/lu";
import { UserContext } from '../../App';
import APIs, { authApi, endpoints } from '../../configs/APIs';
import NotFound from '../../pages/NotFound';

const UserLayout = () => {
    const { slugUser } = useParams();

    const [currentUser,] = useContext(UserContext);

    const [user, setUser] = useState(null);

    const [follow, setFollow] = useState(null);

    const [followers, setFollowers] = useState(null);

    const [countFollowers, setCountFollowers] = useState(null);

    useEffect(() => {
        if (currentUser == null || slugUser !== currentUser.username) {
            const getUser = async () => {
                try {
                    const url = endpoints.userInfo(slugUser);

                    let res = await APIs.get(url);
                    if (res.status === 200) {
                        setUser(res.data);
                    } else {
                        setUser(null)
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

    const addFollow = async () => {
        if (currentUser && user) {
            const follow = {
                beFollowedUserId: user,
            }
            const path = endpoints["follows"];
            const res = await authApi().post(path, follow);
            if (res.status === 201) {
                setFollow(res.data)
            }
        }
    }

    const unfollow = async () => {
        if (currentUser && user && follow) {
            const path = endpoints["follows"];
            const res = await authApi().delete(path, {
                params: {
                    id: follow.id,
                }
            });
            if (res.status === 204) {
                setFollow(null);
            }
        }
    }

    useEffect(() => {
        if (currentUser && user && currentUser.username !== user.username) {
            const getFollow = async () => {
                const path = endpoints["follows"];

                const res = await authApi().get(path, {
                    params: {
                        follower: currentUser.username,
                        following: user.username,
                    }
                });
                if (res.status === 200) {
                    setFollow(res.data);
                }
                else {
                    setFollow(null);
                }
            }
            getFollow();
        }
    }, [currentUser, user])

    

    useEffect(() => {
        if (user) {
            const getCountFollowers = async () => {
                const path = endpoints.countFollowers(user.username);
        
                const res = await APIs.get(path);
                if (res.status === 200) {
                    setCountFollowers(res.data);
                }
                else {
                    setCountFollowers(0);
                }
            }
            getCountFollowers();
            const getFollowers = async () => {
                const path = endpoints.followers(user.username);

                const res = await APIs.get(path);
                if (res.status === 200) {
                    setFollowers(res.data);
                }
                else {
                    setFollowers(null);
                }
            }
            getFollowers();
        }
    }, [user, follow])



    if (user === null) {
        return <>
            <NotFound />
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
                                <h3>Tên người dùng: </h3>
                                <h3 className=" font-bold">{user.username}</h3>
                            </div>
                            <div className="flex gap-2">
                                <BsGenderAmbiguous size="21" />
                                <h3 className="flex gap-2"> Giới tính:</h3>
                                <span className="font-bold">{user.gender === "MALE" && 'Nam'}
                                    {user.gender === "FEMALE" && 'Nữ'}
                                    {user.gender === "ORTHER" && 'Khác'}</span>
                            </div>
                            <div className="flex gap-2">
                                <BsCalendar4 size="21" />
                                <h3>Ngày sinh: </h3>
                                <h3 className=" font-bold">{user.dob}</h3>
                            </div>
                            <div className="flex gap-2">
                                <BsClock size="21" />
                                <h3>Tham gia vào</h3>
                                <h3 className="font-bold">{user.createdAt.split(" ")[0]}</h3>
                            </div>
                        </Card>
                    </div>
                    <div className="md:col-span-6 col-span-10 mt-36 md:mt-0">
                        <div className="flex flex-col mt-5 gap-2">
                            <h1 className="text-3xl font-bold text-left">{user.fullName}</h1>
                            <div className="flex">
                                <div className="flex lg:w-auto w-full gap-2 text-gray-500 items-start">
                                    <div>
                                        <div className="flex gap-2">
                                            <PiUsers size="21" />
                                            <h3 className=" font-bold">{user.follows} người theo dõi</h3>
                                        </div>
                                        <div className="">
                                            {countFollowers > 0 && (<>
                                                <div class="flex -space-x-4">
                                                    {followers && (<>
                                                        {followers.map(follower => {
                                                            return <img class="w-9 h-9 border-2 border-gray-300 rounded-full" src={follower.followUserId.avatar} alt="" />
                                                        })}
                                                        <Link className="flex items-center justify-center w-9 h-9 text-xs font-medium text-white bg-gray-700 border-2 border-gray-300 rounded-full hover:bg-gray-600" >+{countFollowers > 8 ? countFollowers - 8 : 0}</Link>
                                                    </>)}
                                                </div>
                                            </>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto flex gap-5">
                                    {currentUser == null || user.username !== currentUser.username ?
                                        <>
                                            {follow ?
                                                <>
                                                    <Button color="dark" className="ring-2 ring-Dark"><p className="font-bold" onClick={() => unfollow()}>Đang theo dõi</p></Button>

                                                </>
                                                :
                                                <>
                                                    <Button color="dark" className="ring-2 ring-Dark"><p className="font-bold" onClick={() => addFollow()}>Theo dõi</p></Button>

                                                </>}
                                            <Button outline className="ring-2 ring-Dark"><p className="font-bold"><Link to={`/messages/${user.username}`}>Nhắn tin</Link></p></Button>

                                        </>
                                        :
                                        <>
                                            <Button color="dark" className="ring-2 ring-Dark"><p className="font-bold"><Link to="/upload">Đăng tin mới</Link></p></Button>
                                            <Button outline className="ring-2 ring-Dark"><p className="font-bold">Chỉnh sửa thông tin</p></Button>
                                        </>}

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