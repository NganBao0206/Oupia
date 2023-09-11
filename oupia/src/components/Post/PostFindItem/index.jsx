import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { Button } from 'flowbite-react';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { BiComment } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';
import formatCurrency from '../../../utils/priceUtils';
import Moment from 'react-moment';
import 'moment/locale/vi';
import { UserContext } from '../../../App';
import ForumComment from '../../Comment/ForumComment';
import APIs, { authApi, endpoints } from '../../../configs/APIs';

export const PostFindContext = createContext();

const PostFindItem = (props) => {
    const { post } = props;
    const [currentUser,] = useContext(UserContext);
    const [comments, setComments] = useState();
    const [favour, setFavour] = useState(null);
    const [hadLike, setHadLike] = useState(false);
    const inputRef = useRef();


    const minPrice = formatCurrency(post.postFindDetail.minPrice);
    const maxPrice = formatCurrency(post.postFindDetail.maxPrice);
    const area = post.postFindDetail.location;



    useEffect(() => {
        const getComments = async () => {
            try {
                const url = endpoints.postComments(post.slug);
                let res = await APIs.get(url);
                if (res.status === 200) {
                    setComments(res.data);
                }

            } catch (err) {
                console.error(err);
            }
        }
        const getFavourStatus = async () => {
            try {
                const res = await authApi().get(endpoints["favour"], {
                    params: {
                        userId: currentUser.id,
                        postId: post.id
                    }
                });

                if (res.status === 200) {
                    setFavour(res.data);
                }
                else {
                    setFavour(null);
                }
            } catch (err) {
                console.error(err);
            }
        }
        getFavourStatus();
        getComments();
    }, [post, currentUser, hadLike]);

    const addFavour = async () => {
        try {
            const favourite = {
                postId: post,
            }
            const res = await authApi().post(endpoints["favour"], favourite);

            if (res.status === 201) {
                setFavour(res.data);
            }
            else {
                alert("error");
                setFavour(null);
                setHadLike(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const removeFavour = async () => {
        try {
            const res = await authApi().delete(endpoints["favour"], {
                params: {
                    favId: favour.id
                }
            });

            if (res.status === 204) {
                setFavour(null);
            }
            else {
                alert("error");
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (<>
        <PostFindContext.Provider value={{ comments, setComments, inputRef }}>
            <div className=" border border-gray-200 rounded-xl shadow p-5 flex gap-5 flex flex-col">
                <div className="flex gap-5 items-center">
                    <Link to={`/${post.userId.username}`}>
                        <div className=" z-999 w-16 h-16 ring-4 mx-auto ring-gray-200 border-4 border-transparent rounded-full">
                            <img
                                src={post.userId.avatar}
                                alt="Avatar"
                                className="w-full h-full rounded-full"
                            />
                        </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-lg"><Link to={`/${post.userId.username}`}>{post.userId.fullName}</Link></h1>
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
                    <div className="flex items-center mb-2">
                        <div className="flex gap-1 items-center">
                            <PiHeartFill size="25" className="text-heartColor" />
                            <h2>12</h2>
                        </div>
                        <h2 className="ml-auto">{comments && comments.length > 0 ? comments.length + " bình luận" : ""}</h2>
                    </div>
                    {currentUser ? <>
                        <hr />
                        <div className="w-full grid grid-cols-2">
                            <Button onClick={() => favour ? removeFavour() : addFavour()} size="sm" className="hover:bg-gray-200 focus:ring-transparent">
                                {hadLike === true ? <div className="flex gap-3 items-center rounded py-2 px-4 text-heartColor">
                                    <PiHeartFill size="25" />
                                    <h3 className="text-lg">Yêu thích</h3>
                                </div> : <div className="flex gap-3 items-center rounded py-2 px-4 text-Dark hover:text-heartColor">
                                    <PiHeart size="25" />
                                    <h3 className="text-lg">Yêu thích</h3>
                                </div>}
                            </Button>
                            <Button onClick={() => { inputRef.current.focus() }} size="sm" className="hover:bg-gray-200 focus:ring-transparent">
                                <div className="flex gap-3 items-center rounded py-2 px-4 text-Dark">
                                    <BiComment size="25" />
                                    <h3 className="text-lg">Bình luận</h3>
                                </div>
                            </Button>
                        </div>
                        <hr />
                    </> : <></>}
                    <div>
                        <ForumComment post={post} />
                    </div>
                </div>
            </div>
        </PostFindContext.Provider>
    </>);
};

export default PostFindItem;