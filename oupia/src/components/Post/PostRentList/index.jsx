import PostRentItem from "../PostRentItem";

const PostRentList = (props) => {
    const {posts} = props;
    if (!posts) return <>Doi xiu nha</> 
    return (
        <>
        {posts.map((post) => (
            <PostRentItem post={post}></PostRentItem>
        ))}
        </>

    );
}

export default PostRentList;