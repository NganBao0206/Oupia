import React from 'react';
import avatar from '../../../resources/avatar.jpg';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsChat } from 'react-icons/bs';

const UserItem = () => {
    return (
        <div className="flex gap-1">
            <div className="w-12 h-12">
                <img
                    src={avatar}
                    alt="Avatar"
                    className="rounded-full"
                />
            </div>
            <h2 className="text-Dark font-bold">Nguyễn Kim Bảo Ngân</h2>
            <Button color="dark" className="ring-2 ring-Dark ml-auto">
                <p className="font-bold mt-1"><Link to="/upload">Xem</Link></p>
            </Button>
        </div>
    );
};

export default UserItem;