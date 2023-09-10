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
            {posts.map((post) => (
                <div>
                    {post.postFindDetail != null && <PostFindItem post={post} />}
                </div>
            ))}
        </>

    );
}


export default PostFindList;