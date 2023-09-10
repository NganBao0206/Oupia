import React, { useEffect, useState } from 'react';
import MyBreadCrumb from '../../components/MyBreadCrumb';
import UserStatus from '../../components/User/UserStatus';
import APIs, { endpoints } from '../../configs/APIs';
import PostFindList from '../../components/Post/PostFindList';


const Forum = () => {
    const [posts, setPosts] = useState(null);


    useEffect(() => {
        getPosts();
        console.log(posts);
    }, []);

    useEffect(() => {
        console.log(posts);
    }, [posts]);


    const getPosts = async () => {
        try {
            let res = await APIs.get(endpoints['posts'], {
                params: {
                    type: "tenantPost",
                    isDeleted: "0",
                }
            });
            if (res.status === 200) {
                const data = res.data;
                setPosts(data.posts);
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (<>
        <div className="container">
            <MyBreadCrumb BreadCrumbName="Diễn đàn" />
            <div className=" my-5 ">
                <div className="col-span-5 flex flex-col gap-5">
                    <UserStatus posts={posts} />
                    <PostFindList posts={posts} />
                </div>
            </div>
        </div>
    </>);
};

export default Forum;