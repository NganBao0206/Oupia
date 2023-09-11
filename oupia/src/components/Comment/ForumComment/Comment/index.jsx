import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import 'moment/locale/vi';

const Comment = (props) => {
    const { comment } = props;

    if(!comment){
        return (<h1>Doi tí</h1>);
    }

    return (
        <>
            <div className="flex gap-5 items-start w-full py-1 mt-3">
                <div className="w-fit">
                    <div className="w-14 h-14" >
                        <img
                            src={comment.userId.avatar}
                            alt="User commment"
                            className="w-full h-full rounded-full"
                        />
                    </div >
                </div>
                <div className="flex flex-col bg-gray-200 px-5 py-4 rounded-lg">
                    <div className="flex gap-2 items-center">
                        <Link to={`/${comment.userId.username}`}>
                            <p className="font-bold text-base">{comment.userId.fullName}</p>
                        </Link>
                        <p className="text-sm text-gray-500 mt-0.5"><Moment locale='vi' fromNow>{comment.createdAt}</Moment></p>
                    </div>
                    <div className="text-sm">
                        {comment.content}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comment;