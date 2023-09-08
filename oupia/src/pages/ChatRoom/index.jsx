import React, { useEffect, useState } from 'react';
import avatar from '../../resources/avatar.jpg';
import { IoInformationCircleOutline, IoSendSharp } from 'react-icons/io5';
import './style.scss';
import LeftMessage from '../../components/Message/LeftMessage';
import RightMessage from '../../components/Message/RightMessage';
import { db } from '../../configs/FireBase';
import firebase from 'firebase/compat/app';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');

    const sendMessage = async (evt) => {
        evt.preventDefault();

        await db.collection("messages").add({
            content: msg,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg("");


    }
    
    useEffect(() => {
        db.collection("messages").orderBy("created").onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()));
        })
    }, [])

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
        <div className="h-full pl-5 relative">
            <div className="mb-20 chat-container overflow-y-auto">
                <div className="pt-5 pr-5">
                    <LeftMessage />
                    <RightMessage />
                    <LeftMessage />
                    <RightMessage />
                    <LeftMessage />
                    <RightMessage />
                    <LeftMessage />
                    <RightMessage />
                    <LeftMessage />
                    <RightMessage />
                </div>
            </div>
            <div className="absolute right-0 left-0 bottom-0 p-5">
                <div className="flex gap-2 items-start w-full">
                    <div className="flex-grow">
                        <form onSubmit={(evt) => sendMessage(evt)} className="relative">
                            <input value={msg} onChange={(evt) => setMsg(evt.target.value)} type="text" className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blueTemplate dark:focus:border-blue-500" placeholder="Aa" />
                            <button type="submit" className=" absolute right-2.5 bottom-1/2 translate-y-1/2 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-2 py-2"><IoSendSharp className="text-blueTemplate" size={25} /></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default ChatRoom;