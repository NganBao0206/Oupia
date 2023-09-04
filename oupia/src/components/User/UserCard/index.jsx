import { Button, Card } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./style.scss"
import { PostContext } from '../../../pages/Post/PostDetail';

const UserCard = () => {
    const { post } = useContext(PostContext)
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
                    <div className="font-bold text-lg">172</div>
                    <div className="">Bài viết</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="font-bold text-lg">45</div>
                    <div className="">Theo dõi</div>
                </div>
            </div>
            <div id="actions" className="flex justify-center items-center">
                <Link><Button color="dark" className="font-bold mr-4">Theo dõi</Button></Link>
                <Button className=" from-purple-500 to-pink-500" outline>
                    <p>
                        Nhắn tin
                    </p>
                </Button>
            </div>
        </Card >
    );
};

export default UserCard;