import React, { useContext, useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import { PostFindContext } from '../../Post/PostFindItem';
import CommentList from './CommentList';

const ForumComment = (props) => {
    const { post } = props;
    const { comments } = useContext(PostFindContext);


    return (
        <div className='h-fit block bg-white'>
            <CommentInput post={post} />
            {comments ? <CommentList comments={comments} /> : <></>}

        </div >
    );
};

export default ForumComment;