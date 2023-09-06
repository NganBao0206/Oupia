import PostRentItem from "../PostRentItem";

const PostList = (props) => {
    const {posts} = props;
    if (!posts) return <>Doi xiu nha</> 
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
