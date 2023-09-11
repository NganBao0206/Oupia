import React, { useContext } from 'react';
import Comment from '../Comment';
import { PostFindContext } from '../../../Post/PostFindItem';

const CommentList = (props) => {
    const { comments } = props;
    const { page, setPage } = useContext(PostFindContext);

    const handleNextPage = () => {
        setPage(prev => prev + 1);
    }

    return (
        <>
            <div className="w-fit commentList overflow-y-auto w-full">
                {comments && comments.map((comment, index) => (
                    <Comment key={index} comment={comment}></Comment>
                ))}

            </div>

            {comments.length >= (page * 8) ? <>
                <h1 className="font-bold text-sm absolute cursor-pointer" onClick={handleNextPage}>Xem thêm bình luận</h1>
            </> : <></>}
        </>
    );
};

export default CommentList;