import React from 'react';
import PostFindItem from '../PostFindItem';
import { Spinner } from 'flowbite-react';

const PostFindList = (props) => {
    const { posts } = props;

    if (!posts) return (
        <div className="h-full w-full justify-center flex items-center">
            <Spinner size="xl" className=" fill-blueTemplate" />
        </div>
    )

    return (
        <>
<<<<<<< HEAD
            {posts.map((post, index) => (
                <div key={index}>
                    {post.postRentDetail != null && <PostFindItem post={post} />}
=======
            {posts.map((post) => (
                <div>
                    {post.postFindDetail != null && <PostFindItem post={post} />}
>>>>>>> 4e1a9258cfcf041e27ccbabeecfa5845b7ca8e2e
                </div>
            ))}
        </>

    );
}


export default PostFindList;