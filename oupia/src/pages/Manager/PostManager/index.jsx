import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import APIs, { endpoints } from '../../../configs/APIs';
import PostList from '../../../components/Manager/PostManager/PostList';
import formatCurrency from '../../../utils/priceUtils';
import { Button } from 'flowbite-react';
import { FiEdit3 } from 'react-icons/fi';
import { LuTrash } from 'react-icons/lu';

const PostManager = () => {
    const [currentUser,] = useContext(UserContext);
    const [posts, setPosts] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                let res = await APIs.get(endpoints['posts'], {
                    params: {
                        username: currentUser.username
                    }
                });
                if (res.status === 200) {
                    console.log(res.data)
                    setPosts(res.data.posts);
                }

            } catch (err) {
                console.error(err);
            }
        }
        getPost();

    }, [])

    const handlePostClick = (post) => {
        setSelectedPost(post);
    }

    return (<>

        <div className="lg:px-32 my-10">
            <div className="grid grid-cols-8 my-5 gap-5">
                <div className="col-span-5 border border-gray-200 rounded-xl shadow-lg p-10">
                    <div className="flex flex-col gap-5">
                        <h1 className="font-bold text-xl">Các bài viết đã đăng</h1>
                        <div className="w-full">
                            <PostList posts={posts} onPostClick={handlePostClick} />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 border border-gray-200 rounded-xl shadow-lg flex flex-col pb-10">
                    {selectedPost ? (
                        <div>
                            <img className="object-cover h-96 w-full rounded-t-xl" src={selectedPost.image} alt="postImage" />
                            <div className="px-10 mt-10">
                                <h1 className="font-bold text-lg">{selectedPost.title}</h1>
                                <hr className="my-5 w-80 h-1 mx-auto border-gray-300" />
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    <h2>Tên nhà trọ</h2>
                                    <div className="col-span-2 font-bold">
                                        {selectedPost.postRentDetail.motelId.name}
                                    </div>
                                    <h2>Số điện thoại</h2>
                                    <div className="col-span-2 font-bold">
                                        {selectedPost.postRentDetail.motelId.phoneNumber}
                                    </div>
                                    <h2>Địa chỉ</h2>
                                    <div className="col-span-2 font-bold">
                                        {selectedPost.postRentDetail.motelId.fullLocation}
                                    </div>
                                    <h2>Giá tiền</h2>
                                    <div className="col-span-2 font-bold">
                                        {formatCurrency(selectedPost.postRentDetail.price)}đ/tháng
                                    </div>
                                </div>
                                <hr className="my-5 w-80 h-1 mx-auto border-gray-300" />
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    <h2>Diện tích</h2>
                                    <div className="col-span-2 font-bold">
                                        {selectedPost.postRentDetail.area} m²
                                    </div>
                                    <h2>Phòng ngủ</h2>
                                    <div className="col-span-2 font-bold">
                                        {selectedPost.postRentDetail.numOfBedrooms} phòng
                                    </div>
                                    <h2>Phòng tắm</h2>
                                    <div className="col-span-2 font-bold">
                                        {selectedPost.postRentDetail.numOfBathrooms} phòng
                                    </div>
                                    <h2>Số người ở</h2>
                                    <div className="col-span-2 font-bold">
                                        {selectedPost.postRentDetail.minPeople} - {selectedPost.postRentDetail.maxPeople} người
                                    </div>
                                </div>
                                <hr className="my-5 w-80 h-1 mx-auto border-gray-300" />
                                <div className="w-full grid grid-cols-2 gap-5">
                                    <Button color="dark" className="ring-2 ring-Dark w-full">
                                        <div className="flex gap-3 items-center">
                                            <FiEdit3 size="20" className="text-white" />
                                            <p className="font-bold mt-1"><>Chỉnh sửa bài viết</></p>
                                        </div>
                                    </Button>
                                    <Button className=" bg-red-600 w-full hover:bg-red-700 focus:ring-red-700">
                                        <div className="flex gap-3 items-center">
                                            <LuTrash size="20" className="text-white" />
                                            <p className="font-bold mt-1"><>Xóa bài viết</></p>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (<h1 className="mx-auto mt-10 text-lg font-bold">Chọn một bài viết để xem chi tiết</h1>)}
                </div>
            </div>
        </div>

    </>);
};

export default PostManager;