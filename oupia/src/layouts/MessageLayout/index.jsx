import React, { useContext, useEffect, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import './style.scss';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import UserChatItem from '../../components/User/UserChatitem';
import { UserContext } from '../../App';
import { signInWithCustomToken } from 'firebase/auth';
import { auth, db } from '../../configs/FireBase';
import { authApi, endpoints } from '../../configs/APIs';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

const MessageLayout = () => {
    const [authToken, setAuthToken] = useState();
    const [currentUser,] = useContext(UserContext);

    const [followingUsers, setFollowingUsers] = useState();
    const location = (useLocation().pathname === "/messages");
    const [chatRooms, setChatRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const getFbToken = async () => {
            const res = await authApi().get(endpoints["getAuthToken"]);
            setAuthToken(res.data);
        }
        const getRecommendUser = async () => {
            const res = await authApi().get(endpoints.followings(currentUser.username));
            if (res.status === 200) {
                setFollowingUsers(res.data);
            }
        }
        if (currentUser) {
            getRecommendUser();
            getFbToken();
        }
    }, [currentUser])

    useEffect(() => {
        if (authToken && currentUser) {
            signInWithCustomToken(auth, authToken);
            const chatroomsRef = collection(db, 'chatrooms');
            const q = query(chatroomsRef, where('members', 'array-contains', currentUser.username), orderBy("updatedAt", "desc"));
            onSnapshot(q, (snapshot) => {
                setChatRooms(snapshot.docs.map((doc) => doc.data()));

            });
        }
    }, [authToken, currentUser]);

    const results = !searchTerm ? chatRooms : chatRooms.filter(room =>
        room.user2.fullName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );



    if (!currentUser) {
        return (<Navigate to="/login?next=/messages" />);
    }

    return (<>
        <div className="mess-height grid grid-cols-9">
            <div className="col-span-2 mess-height overflow-y-auto border-r border-gray-300 p-5">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Tin nhắn</h1>
                    <div className="relative">
                        <div className="relative h-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <RiSearch2Line className="text-gray-700" size={20} />
                            </div>
                            <input type="search"
                                value={searchTerm}
                                onChange={(evt) => setSearchTerm(evt.target.value)}
                                className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Tìm người dùng..." />
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col">
                        {results.map((item, index) => {
                            return <UserChatItem key={index} user={item.user1.username === currentUser.username ? item.user2 : item.user1} message={item.lastMessage} />
                        })}
                        <h2 className="mt-5 font-bold border-t-2 border-gray-200 py-5">Người bạn theo dõi</h2>
                        {followingUsers && followingUsers.map((followingUser, index) => {
                            return <UserChatItem key={index} user={followingUser.beFollowedUserId} message={null} />
                        })}
                    </div>
                </div>
            </div>
            <div className="col-span-7">
                {location ? (<div className="flex h-full justify-center items-center">
                    <h1 className="text-xl font-bold pb-20">Hãy chọn một đoạn chat để bắt đầu trò chuyện</h1>
                </div>)
                    : (<>
                        <div className="flex flex-col grid grid-cols-7 h-full">
                            <Outlet />
                        </div>
                    </>)
                }
            </div>
        </div >
    </>);
};

export default MessageLayout;