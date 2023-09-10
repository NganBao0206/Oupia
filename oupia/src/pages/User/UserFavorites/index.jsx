import React, { useEffect, useState } from 'react';
import APIs, { endpoints } from '../../../configs/APIs';
import { useParams } from 'react-router-dom';
import PostList from '../../../components/Post/PostRentList';
import MySpinner from '../../../components/MySpinner';

const UserFavourites = () => {
    const { slugUser } = useParams();
    const [posts, setPosts] = useState(null);
    useEffect(() => {

        const getPost = async () => {
            try {
                let res = await APIs.get(endpoints['getFavourOfUser'], {
                    params: {
                        username: slugUser,
                        // page: 1
                    }
                });
                if (res.status === 200) {
                    console.log(res.data)
                    setPosts(res.data);
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

export default UserFavourites;