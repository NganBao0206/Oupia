import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/vi';
import { Link } from 'react-router-dom';

moment.locale('vi');



const UserChatItem = (props) => {
    const { message, user } = props;
    if (user) {
        return (
            <>
                <Link to={`/messages/${user.username}`} className="py-3 px-2 rounded-lg hover:bg-gray-200">
                    <div className="grid grid-cols-5 gap-7 w-full items-center">
                        <div className='col-span-1'>
                            <div className="w-16 h-16 ">
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <div className="col-span-4 flex flex-col items-center gap-1">
                            <h2 className="text-Dark font-bold truncate col-span-4 w-full">{user.fullName}</h2>
                            <div className="flex gap-1 text-gray-500 text-sm w-full">
                                {message && (
                                    <>
                                        {message.type === "text" ? <h3 className="truncate">{message.content}</h3> : <h3 className="truncate">'{message.content.title}'</h3>}
                                        <h3 className="whitespace-nowrap">· {message.createdAt && <Moment locale="vi" fromNow>{message.createdAt.toDate()}</Moment>}</h3>
                                    </>)
                                }

                            </div>
                        </div>
                    </div>
                </Link>

            </>
        );
    }

};

export default UserChatItem;