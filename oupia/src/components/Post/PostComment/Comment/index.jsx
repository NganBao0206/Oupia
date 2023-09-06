import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";

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
                        <p className="text-sm text-gray-500">{comment.createdAt}</p>
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