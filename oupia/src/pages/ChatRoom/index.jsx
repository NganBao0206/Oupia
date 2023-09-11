import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoInformationCircleOutline, IoSendSharp } from 'react-icons/io5';
import './style.scss';
import LeftMessage from '../../components/Message/LeftMessage';
import RightMessage from '../../components/Message/RightMessage';
import APIs, { endpoints } from '../../configs/APIs';
import { UserContext } from '../../App';
import { Link, useParams } from 'react-router-dom';
import { PiUser } from 'react-icons/pi';
import { db } from '../../configs/FireBase';
import { serverTimestamp, collection, query, where, getDocs, addDoc, orderBy, onSnapshot, updateDoc } from "firebase/firestore";
import { Spinner } from 'flowbite-react';

const ChatRoom = () => {
    const [currentUser,] = useContext(UserContext);
    const { slugUser } = useParams();
    const [receiverUser, setReceiverUser] = useState(null);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);


    const sendMessage = (evt) => {
        evt.preventDefault();
        if (msg.trim().length > 0) {
            const chatroomsRef = collection(db, 'chatrooms');
            const combinedUsername = [currentUser.username, receiverUser.username].sort().join(':');

            const q = query(chatroomsRef, where('roomId', '==', combinedUsername));
            getDocs(q).then((snapshot) => {
                const chatroom = snapshot.docs[0];
                const newMesssage = {
                    sender: currentUser.username,
                    content: msg,
                    type: 'text',
                    createdAt: serverTimestamp(),
                }
                if (chatroom) {
                    addDoc(collection(chatroom.ref, 'messages'), {
                        ...newMesssage
                    }).then(() => {
                        updateDoc(chatroom.ref, {
                            lastMessage: newMesssage,
                            updatedAt: serverTimestamp(),
                        });
                    });
                } else {
                    addDoc(chatroomsRef, {
                        roomId: combinedUsername,
                        members: [currentUser.username, receiverUser.username],
                        user1: currentUser,
                        user2: receiverUser
                    }).then((chatroomsRef) => {
                        updateMessage();
                        addDoc(collection(chatroomsRef, 'messages'), {
                            ...newMesssage
                        }).then(() => {
                            updateDoc(chatroomsRef, {
                                lastMessage: newMesssage,
                                updatedAt: serverTimestamp(),
                            });
                        });
                    });
                }
            });
            setMsg('');
        }
    }

    useEffect(() => {
        const getReceiverUser = async () => {
            try {
                const url = endpoints.userInfo(slugUser);

                let res = await APIs.get(url);
                if (res.status === 200) {
                    setLoading(false);
                    setReceiverUser(res.data);
                }

            } catch (err) {
                console.error(err);
            }
        }
        getReceiverUser();
    }, [slugUser])

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const updateMessage = () => {
        if (currentUser) {
            const chatroomsRef = collection(db, 'chatrooms');
            const combinedUsername = [currentUser.username, receiverUser.username].sort().join(':');
            const q = query(chatroomsRef, where('roomId', '==', combinedUsername));
            getDocs(q).then((snapshot) => {
                const chatroom = snapshot.docs[0];
                if (chatroom) {
                    const messageRef = collection(chatroom.ref, "messages");
                    const q2 = query(messageRef, orderBy("createdAt"));
                    onSnapshot(q2, (snapshot) => {
                        setMessages(snapshot.docs.map((doc) => doc.data()));
                    })
                }
            });
        }                                              
        

    }

    

    useEffect(() => {
        setMessages([]);
        const updateMessage = () => {
            const chatroomsRef = collection(db, 'chatrooms');
            const combinedUsername = [currentUser.username, receiverUser.username].sort().join(':');
            const q = query(chatroomsRef, where('roomId', '==', combinedUsername));
            getDocs(q).then((snapshot) => {
                const chatroom = snapshot.docs[0];
                if (chatroom) {
                    const messageRef = collection(chatroom.ref, "messages");
                    const q2 = query(messageRef, orderBy("createdAt"));
                    onSnapshot(q2, (snapshot) => {
                        setMessages(snapshot.docs.map((doc) => doc.data()));
                    })
                }
            });
    
        }
        if (currentUser && receiverUser) {
            updateMessage();
        }
    }, [currentUser, receiverUser])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!receiverUser) {
                setLoading(false);
            }
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [receiverUser]);

    if (loading) {
        return (
          <div className="w-full h-full flex items-center justify-center col-span-7">
            <Spinner size="xl" className=" fill-blueTemplate" />
          </div>
        );
      }
    
      if (!receiverUser) {
        return <div className="w-full h-full flex items-center justify-center col-span-7">Không có người dùng</div>;
      }

    return (<>
        <div className="col-span-5 flex flex-col">
            <div className="py-3 px-5 shadow-lg row-span-1">
                <div className="flex gap-5 w-full items-center">
                    <div className='col-span-1'>
                        <div className="w-12 h-12 ">
                            <img
                                src={receiverUser.avatar}
                                alt="Avatar"
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <h2 className="text-Dark font-bold w-full">{receiverUser.fullName}</h2>
                    <IoInformationCircleOutline size="30" className="pl-auto" />
                </div>
            </div>
            <div className="pl-5">
                <div className=" chat-container overflow-y-auto" >
                    <div className="pt-5 pr-5 flex flex-col gap-2">
                        {messages && messages.map((message) =>
                            <>
                                {message.sender === currentUser.username ? <RightMessage content={message.content} /> : ""}
                                {message.sender === receiverUser.username ? <LeftMessage content={message.content} avatar={receiverUser.avatar} /> : ""}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                </div>
            </div>
            <div className="p-5">
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
        <div className="col-span-2 h-full">
            <div className="h-full col-span-2 border-l border-gray-300 p-5">
                <div className="flex flex-col gap-5 items-center">
                    <Link to="">
                        <div className="z-999 w-24 h-24 ring-4 mx-auto ring-white rounded-full shadow-xl">
                            <img
                                src={receiverUser.avatar}
                                alt="Avatar"
                                className="w-full h-full rounded-full"
                            />
                        </div>
                        <div id="title" className="font-bold text-blueTemplate mt-4 mx-auto text-center text-lg">{receiverUser.fullName}</div>
                    </Link>

                    <div id="actions" className="items-center flex flex-col gap-1">
                        <Link to={`/${receiverUser.username}`}><button className="bg-gray-200 p-3 rounded-full"><PiUser size="25" /></button></Link>
                        <h3 className="text-sm">Trang cá nhân</h3>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default ChatRoom;