import React from 'react';
<<<<<<< HEAD
=======
import PostFindSkeleton from '../../MySkeleton/PostFindSkeleton';
>>>>>>> eae89bd62f899c1e434aadb870c21d071739a95e
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
                    {post.postRentDetail != null && <PostFindItem post={post} />}
                </div>
            ))}
        </>

    );
}


export default PostFindList;