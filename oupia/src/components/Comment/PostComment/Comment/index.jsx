import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');


const Comment = (props) => {
    const { comment } = props
    return (
        <>
            <div className="flex gap-2 items-start w-full py-2 my-3">
                <div className="w-fit">
                    <Avatar className="w-fit my-1" alt="User Avatar" img={comment.userId.avatar} size="md" rounded />
                </div>
                <div className="flex-grow">
                    <div className="flex gap-2">
                        <Link to={`/${comment.userId.username}`}>
                            <p className="font-bold text-base">{comment.userId.fullName}</p>
                        </Link>
                        <p className="text-sm text-gray-500"><Moment locale="vi" fromNow>{comment.createdAt}</Moment></p>
                    </div>
                    <div className="text-sm">
                        {comment.content}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Comment;