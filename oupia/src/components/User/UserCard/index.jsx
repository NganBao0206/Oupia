import { Button, Card } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.scss"
import { PostContext } from '../../../pages/Post/PostDetail';
import APIs, { endpoints } from '../../../configs/APIs';

const UserCard = () => {
    const { post } = useContext(PostContext);
    const [countPosts, setCountPosts] = useState(null);
    const [countFollowers, setCountFollowers] = useState(null);

    useEffect(() => {
        const getCountPost = async () => {
            const res = await APIs.get(endpoints["countPosts"], {
                params: {
                    userId: post.userId.id,
                    isAccepted: "accepted",
                    type: "landlordPost",
                }
            })
            if (res.status === 200) 
                setCountPosts(res.data);
        }

        const getCountFollowers = async () => {
            const res = await APIs.get(endpoints.countFollowers(post.userId.username))
            if (res.status === 200) 
                setCountFollowers(res.data);
        }
        if (post) {
            getCountPost();
            getCountFollowers();
        }
    }, [post])

    return (
        <Card className='items-center'>
            <Link to={`/${post.userId.username}`}>
                <div className=" z-999 w-56 h-56 ring-[5px] mx-auto ring-white rounded-full shadow-xl">
                    <img
                        src={post.userId.avatar}
                        alt="Avatar"
                        className="w-full h-full rounded-full"
                    />
                </div>
                <div id="title" className="font-bold mt-4 mx-auto text-center text-lg">{post.userId.fullName}</div>
            </Link>

            <div id="stats" className="flex justify-between items-center my-2 mx-auto">
                <div className="flex flex-col items-center mr-10">
                    <div className="font-bold text-lg">{countPosts? countPosts : '...'}</div>
                    <div className="">Bài viết</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="font-bold text-lg">{countFollowers? countFollowers : '...'}</div>
                    <div className="">Theo dõi</div>
                </div>  
            </div>
            <div id="actions" className="grid grid-cols-2 gap-4 font-bold items-center">
                <Link><Button color="dark">Theo dõi</Button></Link>
                <Button className=" bg-blueTemplate hover:bg-blueTemplate hover:text-white" outline>Nhắn tin</Button>
            </div>
        </Card >
    );
};

export default UserCard;