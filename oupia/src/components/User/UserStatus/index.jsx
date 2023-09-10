import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import { Button } from 'flowbite-react';
import { LuEdit } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { FaRegHandPointRight } from 'react-icons/fa6';

const UserStatus = (props) => {
    const [currentUser,] = useContext(UserContext);
    const [postCount, setPostCount] = useState(0);
    const { posts } = props;
    const today = new Date().getDate();

    if (!currentUser) {
        return <>
            <div className=" border border-gray-200 rounded-xl shadow p-5 flex gap-5 items-center">

                <h2 className="mx-auto text-lg">
                    Vui lòng đăng nhập để đăng bài viết.<span className="text-blueTemplate font-bold ml-2 hover:text-blue-500"><Link to="/login?next=/forum">Đăng nhập</Link></span>
                </h2>
            </div>
        </>
    }

    if (currentUser.userRole != "TENANT") {
        return <>
            
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
            <h2 className="text-Dark font-bold text-lg flex gap-3 items-center">Đăng các bài tìm trọ để chủ trọ tìm thấy bạn! <FaRegHandPointRight className="me-0 ms-auto"/> </h2>

            <Link to="/upload" className="ml-auto">
                <Button color="dark" className="ring-2 ring-Dark ">
                    <div className="flex gap-3 items-center">
                        <LuEdit size="20" className="text-white" />
                        <p className="font-bold mt-1">Đăng bài mới</p>
                    </div>
                </Button>
            </Link>

        </div>
    </>);
};

export default UserStatus;