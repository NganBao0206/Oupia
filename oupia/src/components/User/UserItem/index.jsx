import React from 'react';
import avatar from '../../../resources/avatar.jpg';

const UserItem = () => {
    return (
        <div className="grid grid-cols-5 gap-7 w-full px-8 items-center">
            <div className='col-span-1'>
                <div className="w-16 h-16 ">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="rounded-full"
                    />
                </div>
            </div>
            <h2 className="text-Dark font-bold truncate col-span-4 w-full">Nguyễn Kim Bảo Ngân </h2>
        </div>
    );
};

export default UserItem;