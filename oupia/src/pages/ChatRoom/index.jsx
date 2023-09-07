import React from 'react';
import avatar from '../../resources/avatar.jpg';
import { IoInformationCircleOutline, IoSendSharp } from 'react-icons/io5';

const ChatRoom = () => {

    const sendMessage = (evt) => {
        evt.preventDefault();
    }

    return (<>
        <div className="py-3 px-5 shadow-lg row-span-1">
            <div className="flex gap-5 w-full items-center">
                <div className='col-span-1'>
                    <div className="w-12 h-12 ">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="rounded-full"
                        />
                    </div>
                </div>
                <h2 className="text-Dark font-bold w-full">Nguyễn Kim Bảo Ngân </h2>
                <IoInformationCircleOutline size="30" className="pl-auto" />
            </div>
        </div>
        <div className="h-full pl-5 py-5 relative overflow-y-auto">
            <div className="mb-20">
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>
                <h1>ahhaha</h1>

            </div>
            <div className="absolute right-0 left-0 bottom-0 p-5">
                <div className="flex gap-2 items-start w-full">
                    <div className="flex-grow">
                        <form onSubmit={(evt) => sendMessage(evt)} className="relative">
                            <input type="text" className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blueTemplate dark:focus:border-blue-500" placeholder="Aa" />
                            <button type="submit" className=" absolute right-2.5 bottom-1/2 translate-y-1/2 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-2 py-2"><IoSendSharp className="text-blueTemplate" size={25} /></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default ChatRoom;