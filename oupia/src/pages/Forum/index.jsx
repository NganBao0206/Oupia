import React, { useEffect, useState } from 'react';
import MyBreadCrumb from '../../components/MyBreadCrumb';
import UserStatus from '../../components/User/UserStatus';
import APIs, { endpoints } from '../../configs/APIs';
import PostFindList from '../../components/Post/PostFindList';
import { Link } from 'react-router-dom';
import { BiCaretDown } from 'react-icons/bi';


const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(null);


    useEffect(() => {
        if (page) {
            const getPosts = async () => {

                try {
                    let res = await APIs.get(endpoints['posts'], {
                        params: {
                            type: "tenantPost",
                            isDeleted: "0",
                            page: page,
                        }
                    });
                    if (res.status === 200) {
                        if (page && posts.length > (page * 8 - 8)) return;
                        if (page === 1) setPosts([]);
                        setTotal(res.data.total);
                        setPosts(current => {
                            return [...current, ...res.data.posts]
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            if (page && posts.length > (page * 8 - 8)) return;
            if (page === 1) setPosts([]);
            getPosts();
        }

    }, [page, posts]);


    useEffect(() => {
        console.log("dequyne");
    }, [posts])


    return (<>
        <div className="container">
            <MyBreadCrumb BreadCrumbName="Diễn đàn" />
            <div className=" my-5 ">
                <div className="col-span-5 flex flex-col gap-5">
                    <UserStatus posts={posts} />
                    <PostFindList posts={posts} />
                    {posts.length < total && (<>
                        <div className="flex justify-center">
                            <Link onClick={() => setPage(page + 1)} className="flex font-medium w-fit my-3 gap-1 text-blueTemplate hover:underline">Xem thêm <BiCaretDown size={20} /></Link>
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    </>);
};

export default Forum;