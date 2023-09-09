import React, { useContext } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import './style.scss';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import UserChatItem from '../../components/User/UserChatitem';
import { UserContext } from '../../App';

const MessageLayout = () => {
    const [user,] = useContext(UserContext);
    const location = (useLocation().pathname === "/messages");

    if (!user) {
        return (<Navigate to="/login?next=/messages" />);
    }

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
                        <Link to="/messages/Dung" className="py-3 px-2 rounded-lg hover:bg-gray-200">
                            <UserChatItem />
                        </Link>
                        <Link to="/messages/haha" className="py-3 px-2 rounded-lg hover:bg-gray-200">
                            <UserChatItem />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-span-7">
                {location ? (<div className="flex h-full justify-center items-center">
                    <h1 className="text-xl font-bold pb-20">Hãy chọn một đoạn chat để bắt đầu trò chuyện</h1>
                </div>)
                    : (<>
                        <div className="flex flex-col grid grid-cols-7">
                            <Outlet />
                        </div>
                    </>)
                }
            </div>
        </div >
    </>);
};

export default MessageLayout;