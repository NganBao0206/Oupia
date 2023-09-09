import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import { Button } from 'flowbite-react';
import { LuEdit } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const UserStatus = () => {
    const [currentUser,] = useContext(UserContext);

    if (!currentUser) {
        return <>
            <div className=" border border-gray-200 rounded-xl shadow p-5 flex gap-5 items-center">

                <h2 className="mx-auto text-lg">
                    Vui lòng đăng nhập để đăng bài viết.<span className="text-blueTemplate font-bold ml-2 hover:text-blue-500"><Link to="/login?next=/forum">Đăng nhập</Link></span>
                </h2>
            </div>
        </>
    }
    return (<>
        <div className=" border border-gray-200 rounded-xl shadow p-5 flex gap-5 items-center">

            <div className="w-16 h-16">
                <img
                    src={currentUser.avatar}
                    alt="Avatar"
                    className="w-full h-full rounded-full ring-4 ring-gray-200 border-4 border-transparent rounded-full"
                />
            </div>
            <h2 className="text-Dark font-bold text-lg">Bạn chưa đăng bài viết mới trong hôm nay</h2>
            <Button color="dark" className="ring-2 ring-Dark ml-auto">
                <div className="flex gap-3 items-center">
                    <LuEdit size="20" className="text-white" />
                    <p className="font-bold mt-1"><Link to="/upload">Đăng bài mới</Link></p>
                </div>
            </Button>

        </div>
    </>);
};

export default UserStatus;