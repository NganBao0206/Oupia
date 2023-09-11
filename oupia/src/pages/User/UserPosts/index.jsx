import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom/dist';
import APIs, { endpoints } from '../../../configs/APIs';
import PostList from '../../../components/Post/PostRentList';
import { BiCaretDown } from 'react-icons/bi';
import MySpinner from '../../../components/MySpinner';


const UserPosts = (props) => {
    const { slugUser } = useParams();
    const [type, setType] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(null);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (props.userRole === "TENANT")
            setType("tenantPost");
        else setType("landlordPost");


    }, [props.userRole])

    useEffect(() => {
        const getPosts = async () => {
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
                    hasFetched.current = false;
                }

            } catch (err) {
                console.error(err);
            }
        }
        if (page && slugUser && type && !hasFetched.current) {
            getPosts();
            hasFetched.current = true;
        }
    }, [page, slugUser, type])

    if (posts === null) {
        return <>
            <div className="h-32 w-full items-center flex flex-col ">
                <MySpinner/>
            </div>
        </>
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