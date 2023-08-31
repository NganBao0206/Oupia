import { Breadcrumb } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import UserCard from '../../components/User/card';
import RecommendList from '../../components/RecommendList';
import PostDetail from '../../components/PostDetail/detail';
import PostComment from '../../components/Comment/post';
import { useParams } from 'react-router-dom';
import APIs, { endpoints } from '../../configs/APIs';

const Post = () => {
    const { slugPost } = useParams();
    const [post, setPost] = useState();
    const [images, setImages] = useState();
    
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
        <div className="container">
            <Breadcrumb BreadCrumbName="Nhà trọ giá rẻ"/>
            <div className="grid grid-cols-7 gap-5">
                <div className="col-span-5">
                    <PostDetail post={post} images={images} />
                </div>
                <div className="col-span-2 flex flex-col gap-5">
                    <UserCard user={post.userId} />
                    <PostComment user={post.userId}/>
                </div>
            </div>
            <RecommendList title="Bài đăng liên quan" />
        </div>
    );
};

export default Post;