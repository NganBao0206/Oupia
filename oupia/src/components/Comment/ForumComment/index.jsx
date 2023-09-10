import React, { useContext } from 'react';
import CommentInput from './CommentInput';
import { PostFindContext } from '../../Post/PostFindItem';
import CommentList from './CommentList';

const ForumComment = (props) => {
    const { post } = props;
    const { comments } = useContext(PostFindContext);

    return (
        <div className='h-fit block bg-white'>
            {comments ? <CommentList comments={comments} /> : <></>}
            <CommentInput post={post} />

        </div >
    );
};

export default ForumComment;