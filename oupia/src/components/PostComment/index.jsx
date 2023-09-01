import React, { useContext, useState } from 'react';
import CommentInput from './CommentInput';

const PostComment = () => {

    return (
        <div className='h-full block p-3 bg-white border border-gray-200 rounded-lg shadow-md'>
           <CommentInput/>
        </div >
    );
};

export default PostComment;