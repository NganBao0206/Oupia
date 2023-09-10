import { useContext } from 'react';
import { PostContext } from '../../../../pages/Post/PostDetail';
import Comment from '../Comment';
import "./style.scss";

const CommentList = (props) => {
    const {comments} = props;
    return (
        <>
            <div className="w-fit commentList overflow-y-auto w-full mt-5">
                {comments.map((comment) => (
                    <Comment comment={comment}></Comment>
                ))}
            </div>
        </>
    )
}

export default CommentList;