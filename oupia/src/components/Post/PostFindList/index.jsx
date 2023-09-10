import React from 'react';
import PostFindItem from '../PostFindItem';
import MySpinner from '../../MySpinner';

const PostFindList = (props) => {
    const { posts } = props;

    if (!posts) return (
        <div className="h-screen w-full items-center flex flex-col ">
            <MySpinner/>
        </div>
    )

    return (
        <>
            {posts.map((post) => (
                <div>
                    {post.postFindDetail != null && <PostFindItem post={post} />}
                </div>
            ))}
        </>

    );
}


export default PostFindList;