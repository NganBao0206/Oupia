import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom/dist';
import APIs, { endpoints } from '../../../configs/APIs';
import PostList from '../../../components/Post/PostRentList';
import { BiCaretDown } from 'react-icons/bi';

const UserPosts = (props) => {
    const { slugUser } = useParams();
    const [type, setType] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(null);
    useEffect(() => {
        if (props.userRole === "TENANT")
            setType("tenantPost");
        else setType("landlordPost");


    }, [props.userRole])

    useEffect(() => {
        const getPost = async () => {
            try {
                let res = await APIs.get(endpoints['posts'], {
                    params: {
                        username: slugUser,
                        page: page,
                        type: type
                    }
                });
                if (res.status === 200) {
                    setTotal(res.data.total);
                    setPosts(current => {
                        return [...current, ...res.data.posts]
                    });
                }

            } catch (err) {
                console.error(err);
            }
        }
        if (page && slugUser && type)
            getPost();
    }, [page, slugUser, type])

    if (posts === null) {
        return <>doi xiu</>
    }
    return (
        <>
            <PostList posts={posts}></PostList>
            {posts.length < total && (<>
                <div className="flex justify-center">
                    <Link onClick={() => setPage(page + 1)} className="flex font-medium w-fit my-3 gap-1 text-blueTemplate hover:underline">Xem thêm <BiCaretDown size={20} /></Link>
                </div>
            </>)}

        </>

    );
};

export default UserPosts;