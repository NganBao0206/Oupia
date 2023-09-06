import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import { BsBookmark } from 'react-icons/bs';
import image from '../../../resources/avatar.jpg';
import './style.scss';
import { Button } from 'flowbite-react';
import { LuHeart } from 'react-icons/lu';
import { PiShareFat } from 'react-icons/pi';
import { BiComment } from 'react-icons/bi';

const PostFindItem = () => {
    const [currentUser,] = useContext(UserContext);

    return (<>
        <div className=" border border-gray-200 rounded-xl shadow-lg p-5 flex gap-5 flex flex-col gap-1 ">
            {/* title */}
            <div className="flex gap-5 items-center">
                <Link to={`/${currentUser.username}`}>
                    <div className=" z-999 w-16 h-16 ring-4 mx-auto ring-gray-200 border-4 border-transparent rounded-full">
                        <img
                            src={currentUser.avatar}
                            alt="Avatar"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                </Link>
                <div className="flex flex-col  gap-1">
                    <h1 className="font-bold text-lg">{currentUser.fullName}</h1>
                    <h3 className="text-gray-500 text-sm">2 giờ trước · Gò vấp</h3>
                </div>
                <div className="flex gap-2 ml-auto items-center text-Dark hover:text-yellow-400 hover:cursor-pointer">
                    <h3 className="font-bold">Lưu bài viết</h3>
                    <BsBookmark size="30" />
                </div>
            </div>
            {/* content */}
            <p>
                Mình đang có nhà nguyên căn giá 7 triệu 1 tháng (8 người ở) chưa tính tiền điện nước, gồm có 4 phòng ngủ, 3 nhà vệ sinh và 2 sân thượng, rộng rãi thoải mái, cách đại học SP TDTT, đại học Mở chỉ 6 phút di chuyển bằng xe máy, hiện tại đã có 7 người, còn thiếu 1 bạn nữa.
                Ai có nhu cầu thì ib mình để tìm hiểu kỹ thêm nhé.
            </p>
            <div className="post-image -ml-5">
                <img src={image} alt="postImage" className="w-full h-[600px] object-cover" />
            </div>
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
                        <PiShareFat size="25"/>
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