import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import APIs, { endpoints } from '../../../configs/APIs';
import PostList from '../../../components/Post/PostRentList';
import MySpinner from '../../../components/MySpinner';

const UserPosts = (props) => {
    const { slugUser } = useParams();
    const [, setType] = useState(null);
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        if (props.userRole === "TENANT")
            setType("tenantPost");
        else setType("landlordPost");
        const getPost = async () => {
            try {
                let res = await APIs.get(endpoints['posts'], {
                    params: {
                        username: slugUser,
                        page: 1
                    }
                });
                if (res.status === 200) {
                    console.log(res.data)
                    setPosts(res.data.posts);
                }

            } catch (err) {
                console.error(err);
            }
        }
        getPost();

    }, [])
    if (posts === null) {
        return <>
            <div className="h-32 w-full items-center flex flex-col ">
                <MySpinner/>
            </div>
        </>
    }
    return (
        <PostList posts={posts}></PostList>
    );
};

export default UserPosts;