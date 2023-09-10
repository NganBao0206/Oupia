import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { Button } from 'flowbite-react';
import { LuHeart } from 'react-icons/lu';
import { PiShareFat } from 'react-icons/pi';
import { BiComment } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';
import formatCurrency from '../../../utils/priceUtils';
import Moment from 'react-moment';
import 'moment/locale/vi';
import { UserContext } from '../../../App';


const PostFindItem = (props) => {
    const { post } = props;
    const [currentUser,] = useContext(UserContext);
    const minPrice = formatCurrency(post.postFindDetail.minPrice);
    const maxPrice = formatCurrency(post.postFindDetail.maxPrice);
    const area = post.postFindDetail.location;


    return (<>
        <div className=" border border-gray-200 rounded-xl shadow p-5 flex gap-5 flex flex-col">
            <div className="flex gap-5 items-center">
                <Link to="">
                    <div className=" z-999 w-16 h-16 ring-4 mx-auto ring-gray-200 border-4 border-transparent rounded-full">
                        <img
                            src={post.userId.avatar}
                            alt="Avatar"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                </Link>
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-lg">{post.userId.id === currentUser.id ? (post.userId.fullName + " (Bạn)") : post.userId.fullName}</h1>
                    <h3 className="text-gray-500 text-sm"> <Moment fromNow locale="vi">{post.createdAt}</Moment></h3>
                </div>
                <div className="flex gap-2 ml-auto pb-3 pr-3 text-Dark hover:cursor-pointer">
                    <FiMoreHorizontal size="35" />
                </div>
            </div>

            <div >
                <h2 className="text-2xl font-bold">
                    {post.title}
                </h2>
                <h3 className="mt-5">Giá đề xuất: <span className="text-blueTemplate font-bold">{minPrice} - {maxPrice}đ/tháng</span></h3>
                <h3 className="mb-5">Khu vực: {area}</h3>
                <p>
                    {post.description}
                </p>
            </div>

            {post.image && <div className="post-image -ml-5">
                <img src={post.image}
                    alt="postImage" className="w-full h-[600px] object-cover" />
            </div>}

            <div className="flex flex-col">
                <hr />
                <div className="w-full grid grid-cols-3">
                    <Button size="sm" className="hover:bg-gray-200 focus:ring-transparent">
                        <div className="flex gap-3 items-center rounded py-2 px-4 text-Dark">
                            <LuHeart size="25" />
                            <h3 className="text-lg">Yêu thích</h3>
                        </div>
                    </Button>
                    <Button size="sm" className="hover:bg-gray-200 focus:ring-transparent">
                        <div className="flex gap-3 items-center rounded py-2 px-4 text-Dark">
                            <BiComment size="25" />
                            <h3 className="text-lg">Bình luận</h3>
                        </div>
                    </Button>
                    <Button size="sm" className="hover:bg-gray-200 focus:ring-transparent">
                        <div className="flex gap-3 items-center rounded py-2 px-4 text-Dark">
                            <PiShareFat size="25" />
                            <h3 className="text-lg">Chia sẻ</h3>
                        </div>
                    </Button>
                </div>
                <hr />
            </div>

        </div>
    </>);
};

export default PostFindItem;