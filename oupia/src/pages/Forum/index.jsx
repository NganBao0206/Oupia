import React, { useEffect, useState } from 'react';
import MyBreadCrumb from '../../components/MyBreadCrumb';
import UserStatus from '../../components/User/UserStatus';
import UserItem from '../../components/User/UserItem';
import APIs, { endpoints } from '../../configs/APIs';
import PostFindList from '../../components/Post/PostFindList';


const Forum = () => {
    const [posts, setPosts] = useState(null);


    useEffect(() => {
        getPosts();
        console.log(posts);
    }, []);


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
        <div className="lg:px-32">
            <MyBreadCrumb BreadCrumbName="Diễn đàn" />
            <div className="grid grid-cols-7 my-5 gap-5">
                <div className="col-span-5 flex flex-col gap-5">
                    <UserStatus posts={posts} />
                    <PostFindList posts={posts} />
                </div>
                <div className="col-span-2">
                    <div className="py-8 items-center border border-gray-200 rounded-xl shadow-lg flex flex-col">
                        <h2 className=" px-10 text-Dark font-bold text-xl w-full text-center">Người bạn theo dõi</h2>
                        <div className="inline-flex items-center justify-center w-full relative">
                            <hr className="w-48 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                            <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                                <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Forum;