import React, { useContext } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { PostContext } from '../../../pages/Post/PostDetail';

const PostComment = () => {
    const { comments, } = useContext(PostContext);

    return (
        <div className='h-fit block p-3 bg-white border border-gray-200 rounded-lg shadow-md'>
            <CommentInput />
            {comments && <CommentList comments={comments} />
            }
        </div >
    );
};

export default PostComment;