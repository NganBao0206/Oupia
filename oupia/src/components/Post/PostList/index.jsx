import PostRentSkeleton from "../../MySkeleton/PostRentSkeleton";
import PostRentItem from "../PostRentItem";

const PostList = (props) => {
    const { posts } = props;
    const numSkeletons = Math.floor(Math.random() * (2)) + 3;
    const skeletons = Array.from({ length: numSkeletons });


    if (!posts) return (
        <>
            {skeletons.map((_, index) => (
                <PostRentSkeleton key={index} />
            ))}
        </>
    )

    return (
        <>
            {posts.map((post) => (
                <>
                    {post.postRentDetail != null && <PostRentItem post={post}></PostRentItem>}
                </>
            ))}
        </>

    );
}

export default PostList;
