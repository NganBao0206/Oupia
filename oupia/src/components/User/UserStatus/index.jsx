import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import { Button } from 'flowbite-react';
import { LuEdit } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const UserStatus = () => {
    const [currentUser,] = useContext(UserContext);

    if (currentUser === null) {
        return <>
            đang loading nè
        </>
    }
    return (<>

        <div className="w-16 h-16">
            <img
                src={currentUser.avatar}
                alt="Avatar"
                className="w-full h-full rounded-full"
            />
        </div>
        <h2 className="text-Dark font-bold text-lg">Bạn chưa đăng bài viết mới trong hôm nay</h2>
        <Button color="dark" className="ring-2 ring-Dark ml-auto">
            <div className="flex gap-3 items-center">
                <LuEdit size="20" className="text-white" />
                <p className="font-bold mt-1"><Link to="/upload">Đăng bài mới</Link></p>
            </div>
        </Button>

    </>);
};

export default UserStatus;