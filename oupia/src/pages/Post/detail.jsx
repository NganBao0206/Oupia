import { Breadcrumb } from 'flowbite-react';
import React, { createContext, useEffect, useState } from 'react';
import UserCard from '../../components/User/card';
import RecommendList from '../../components/RecommendList';
import PostDetail from '../../components/PostDetail/detail';
import { useParams } from 'react-router-dom';
import APIs, { endpoints } from '../../configs/APIs';
import PostComment from '../../components/PostComment';

export const PostContext = createContext();

const Post = () => {
    const { slugPost } = useParams();
    const [post, setPost] = useState();
    const [images, setImages] = useState();
    const [comments, setComments] = useState();

    const getComments = async () => {
        try {
            const url = endpoints.postComments(slugPost);

            let res = await APIs.get(url);
            if (res.status === 200) {
                console.log(res.data)
                setComments(res.data);
            }

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const getPostDetail = async () => {
            try {
                const url = endpoints.postInfo(slugPost);

                let res = await APIs.get(url);
                if (res.status === 200) {
                    console.log(res.data)
                    setPost(res.data);
                }

            } catch (err) {
                console.error(err);
            }
        }

        const getImages = async () => {
            try {
                const url = endpoints.postImages(slugPost);

                let res = await APIs.get(url);
                if (res.status === 200) {
                    console.log(res.data)
                    setImages(res.data);
                }

            } catch (err) {
                console.error(err);
            }
        }

        getPostDetail();
        getImages();
        getComments();
    }, [])



    if (!post || !images) {
        return (<>
            dang loading
        </>)
    }

    if (post && post.postFindDetail) {
        return (<>
            not found
        </>)
    }
    return (
        <PostContext.Provider value={{post, images, comments, setComments, getComments}}>
            <div className="lg:px-32">
                <Breadcrumb BreadCrumbName="Nhà trọ giá rẻ" />
                <div className="grid grid-cols-7 gap-5">
                    <div className="col-span-5">
                        <PostDetail/>
                    </div>
                    <div className="col-span-2 flex flex-col gap-5">
                        <UserCard />
                        <PostComment/>
                    </div>
                </div>
                <RecommendList title="Bài đăng liên quan" />
            </div>
        </PostContext.Provider>
    );
};

export default Post;