import React, { useContext } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { PostContext } from '../../../pages/Post/PostDetail';
import { Link } from 'react-router-dom';

const PostComment = () => {
    const { comments, total, setPage, page} = useContext(PostContext);

    return (
        <div className='h-fit block p-3 bg-white border border-gray-200 rounded-lg shadow-md'>
            <CommentInput />
            {comments && (<>
                <CommentList comments={comments} />
                {total > comments.length &&
                    <Link onClick={() => setPage(page + 1)} className="flex font-medium w-fit my-3 gap-1 text-blueTemplate hover:underline">Xem thêm</Link>
                }
            </>)}
        </div >
    );
};

export default PostComment;