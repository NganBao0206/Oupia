import { Card, Carousel } from 'flowbite-react';
import React, { useContext } from 'react';
import { LuBedSingle, LuHeart } from "react-icons/lu";
import { BiArea, BiBath } from 'react-icons/bi';
import { PiShareFat, PiUsersThree } from 'react-icons/pi';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaPhoneSolid } from 'react-icons/lia';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import formatCurrency from '../../../utils/priceUtils';
import { PostContext } from '../../../pages/Post/PostDetail';


const PostContent = () => {
    const { post, images } = useContext(PostContext);
    const price = formatCurrency(post.postRentDetail.price)
    return (
        <Card className="h-full">
            <Carousel slideInterval={5000} className="mb-5" style={{ height: "600px" }}>
                {images.map((image) => (
                    <div className='w-full h-full'>
                        <img
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="img"
                            src={image}
                        />
                    </div>
                ))}
            </Carousel>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div className="flex">
                <h3 className="font-bold text-blueTemplate text-lg">{price}đ/tháng</h3>
                <div className="ml-auto flex gap-3 mr-3">
                    <LuHeart size="25" className="text-heartColor" />
                    <PiShareFat size="25" className="text-Dark" />
                </div>
            </div>
            <hr />
            <h2 className="font-extrabold text-xl" >Thông tin phòng trọ</h2>
            <div className=" mb-2 flex flex-col gap-2">
                <div className="flex text-gray-700 items-center gap-1">
                    <HiOutlineHomeModern size="25" />
                    <div className="flex gap-3">
                        <h3>Tên nhà trọ:</h3>
                        <h3>{post.postRentDetail.motelId.name}</h3>
                    </div>
                </div>
                <div className="flex text-gray-700 items-center gap-1">
                    <LiaPhoneSolid size="25" />
                    <div className="flex gap-3">
                        <h3>Số diện thoại:</h3>
                        <h3>{post.postRentDetail.motelId.phoneNumber}</h3>
                    </div>
                </div>
                <div className="flex text-gray-700 items-center gap-1">
                    <IoLocationOutline size="25" />
                    <div className="flex gap-3">
                        <h3>Địa Chỉ:</h3>
                        <h3>{post.postRentDetail.motelId.fullLocation}</h3>
                    </div>
                </div>
            </div>
            <hr />
            <h2 className="font-extrabold text-xl" >Đặc điểm phòng trọ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 container gap-5 mb-2">
                <div className="max-w-sm p-5 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center">
                    <BiArea className="mr-3 text-blueTemplate" size="25"></BiArea>
                    <h3>{post.postRentDetail.area}m²</h3>
                </div>
                <div className="max-w-sm p-5 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center">
                    <LuBedSingle className="mr-3 text-blueTemplate" size="25"></LuBedSingle>
                    <h3>{post.postRentDetail.numOfBedrooms} Phòng ngủ</h3>
                </div>
                <div className="max-w-sm p-5 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center">
                    <BiBath className="mr-3 text-blueTemplate" size="25"></BiBath>
                    <h3>{post.postRentDetail.numOfBathrooms} Phòng tắm</h3>
                </div>
                <div className="max-w-sm p-5 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center">
                    <PiUsersThree className="mr-3 text-blueTemplate" size="25"></PiUsersThree>
                    <h3>{post.postRentDetail.minPeople} - {post.postRentDetail.maxPeople} người</h3>
                </div>
            </div>
            <hr />
            <h2 className="font-extrabold text-xl" >Mô tả chi tiết</h2>
            <div className="whitespace-break-spaces">{post.description}</div>
        </Card>
    );
};

export default PostContent;