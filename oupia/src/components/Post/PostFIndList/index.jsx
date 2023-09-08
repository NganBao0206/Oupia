import React from 'react';
import PostFindSkeleton from '../../MySkeleton/PostFindSkeleton';
import PostFindItem from '../PostFindItem';

const PostFindList = (props) => {
    const { posts } = props;
    const numSkeletons = Math.floor(Math.random() * (2)) + 3;
    const skeletons = Array.from({ length: numSkeletons });


    if (!posts) return (
        <>
            {skeletons.map((_, index) => (
                <PostFindSkeleton key={index} />
            ))}
        </>
    )

    return (
        <>
            {posts.map((post) => (
                <div>
                    {post.postRentDetail != null && <PostFindItem post={post} />}
                </div>
            ))}
        </>

    );
}


export default PostFindList;