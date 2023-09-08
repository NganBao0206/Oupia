import React from 'react';
import avatar from '../../../resources/avatar.jpg';


const UserChatItem = () => {
    return (
        <>
            <div className="grid grid-cols-5 gap-7 w-full items-center">
                <div className='col-span-1'>
                    <div className="w-16 h-16 ">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="rounded-full"
                        />
                    </div>
                </div>
                <div className="col-span-4 flex flex-col items-center gap-1">
                    <h2 className="text-Dark font-bold truncate col-span-4 w-full">Nguyễn Kim Bảo Ngân </h2>
                    <div className="flex gap-1 text-gray-500 text-sm w-full">
                        <h3 className="truncate">Còn phòng trọ không ạ</h3>
                        <h3 className="whitespace-nowrap">· 2 giờ trước</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserChatItem;