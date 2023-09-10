import React from 'react';
import Comment from '../Comment';

const CommentList = (props) => {
    const { comments } = props;
    return (
        <>
            <div className="w-fit commentList overflow-y-auto w-full">
                {comments && comments.map((comment) => (
                    <Comment comment={comment}></Comment>
                ))}
            </div>
        </>
    );
};

export default CommentList;