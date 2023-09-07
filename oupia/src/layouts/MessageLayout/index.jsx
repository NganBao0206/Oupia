import React from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import './style.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';
import UserChatItem from '../../components/User/UserChatitem';
import { Button } from 'flowbite-react';
import avatar from '../../resources/avatar.jpg';
import { PiUser } from 'react-icons/pi';

const MessageLayout = () => {
    const location = (useLocation().pathname === "/messages/");

    return (<>
        <div className="mess-height grid grid-cols-9">
            <div className="col-span-2 border-r border-gray-300 p-5">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Tin nhắn</h1>
                    <div className="relative">
                        <div className="relative h-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <RiSearch2Line className="text-gray-700" size={20} />
                            </div>
                            <input type="search"
                                className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Tìm người dùng..." />
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col">
                        <Link to="/messages/hehe" className="py-3 px-2 rounded-lg hover:bg-gray-200">
                            <UserChatItem />
                        </Link>
                        <Link to="/messages/haha" className="py-3 px-2 rounded-lg hover:bg-gray-200">
                            <UserChatItem />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`${location ? "col-span-7" : "col-span-5"}`}>
                {location ? (<div className="flex h-full justify-center items-center">
                    <h1 className="text-xl font-bold pb-20">Hãy chọn một đoạn chat để bắt đầu trò chuyện</h1>
                </div>)
                    : (<div className="flex flex-col h-full">
                        <Outlet />
                    </div>)
                }
            </div>
            {location ? ""
                :
                (<div className="col-span-2 border-l border-gray-300 p-5">
                    <div className="flex flex-col gap-5 items-center">
                        <Link to="">
                            <div className="z-999 w-24 h-24 ring-4 mx-auto ring-white rounded-full shadow-xl">
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full"
                                />
                            </div>
                            <div id="title" className="font-bold text-blueTemplate mt-4 mx-auto text-center text-lg">Nguyễn Kim Bảo Ngân</div>
                        </Link>

                        <div id="actions" className="items-center flex flex-col gap-1">
                            <Link><button className="bg-gray-200 p-3 rounded-full"><PiUser size="25"/></button></Link>
                            <h3 className="text-sm">Trang cá nhân</h3>
                        </div>
                    </div>
                </div>)}
        </div >
    </>);
};

export default MessageLayout;