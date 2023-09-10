import React, { useEffect, useState } from 'react';
import APIs, { endpoints } from '../../../configs/APIs';
import { Link, useParams } from 'react-router-dom';
import PostList from '../../../components/Post/PostRentList';
import MySpinner from '../../../components/MySpinner';
import { BiCaretDown } from 'react-icons/bi';

const UserFavourites = () => {
    const { slugUser } = useParams();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(null);
    useEffect(() => {
        if (page && slugUser) {
            const getPost = async () => {
                try {
                    let res = await APIs.get(endpoints['getFavourOfUser'], {
                        params: {
                            username: slugUser,
                            page: page,
                        }
                    });
                    if (res.status === 200) {
                        if (page && posts.length > (page * 8 - 8)) return;
                        if (page === 1) setPosts([]);
                        setTotal(res.data.total)
                        setPosts(current => {
                            return [...current, ...res.data.posts]
                        });
                    }
    
                } catch (err) {
                    console.error(err);
                }
            }
            getPost();
        }
        

    }, [page, slugUser])
    if (posts === null) {
        return <>
            <div className="h-32 w-full items-center flex flex-col ">
                <MySpinner />
            </div>
        </>
    }
    return (<>
        <PostList posts={posts}></PostList>
        {posts.length < total && (<>
            <div className="flex justify-center">
                <Link onClick={() => setPage(page + 1)} className="flex font-medium w-fit my-3 gap-1 text-blueTemplate hover:underline">Xem thêm <BiCaretDown size={20} /></Link>
            </div>
        </>)}
    </>

    );
};

export default UserFavourites;