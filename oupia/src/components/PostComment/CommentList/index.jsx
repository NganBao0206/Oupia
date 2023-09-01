import { useContext } from 'react';
import { PostContext } from '../../../pages/Post/detail';
import Comment from '../Comment';


const CommentList = (props) => {
    const {comments} = props;
    return (
        <>
            <div className="w-fit h-fit">
                {comments.map((comment) => (
                    <Comment comment={comment}></Comment>
                ))}
            </div>
        </>
    )
}

export default CommentList;