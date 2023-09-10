import React, { createContext, useEffect, useState } from 'react';
import UserCard from '../../../components/User/UserCard';
import RecommendList from '../../../components/RecommendList';
import { useParams } from 'react-router-dom';
import APIs, { endpoints } from '../../../configs/APIs';
import PostContent from '../../../components/Post/PostContent';
import MyBreadCrumb from '../../../components/MyBreadCrumb';
import PostComment from '../../../components/Comment/PostComment';
import NotFound from '../../NotFound';

export const PostContext = createContext();

const PostDetail = () => {
    const { slugPost } = useParams();
    const [post, setPost] = useState();
    const [images, setImages] = useState();
    const [comments, setComments] = useState();
    const [recommentList, setRecommentList] = useState();

    const getComments = async () => {
        try {
            const url = endpoints.postComments(slugPost);

            let res = await APIs.get(url);
            if (res.status === 200) {
                console.log(res.data)
                setComments(res.data);
            }
            else {
                
            }

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const url = endpoints.postComments(slugPost);
    
                let res = await APIs.get(url);
                if (res.status === 200) {
                    console.log(res.data)
                    setComments(res.data);
                }
                else {
                    
                }
    
            } catch (err) {
                console.error(err);
            }
        }
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
    }, [slugPost])


    useEffect(() => {
        const getRecomments = async () => {
            try {
                let res = await APIs.get(endpoints['posts'], {
                    params: {
                        page: 1,
                        longitude: post.postRentDetail.motelId.locationLongitude,
                        latitude: post.postRentDetail.motelId.locationLatitude,
                    }
                });
                if (res.status === 200) {
                    console.log(res.data)
                    setRecommentList(res.data.posts);
                }
            } catch (err) {
                console.error(err);
            }
        }
        if (post) {
            getRecomments();
        }
    }, [post] )



    if (!post || !images) {
        return (<>
            dang loading
        </>)
    }

    if (post && post.postFindDetail) {
        return (<>
            <NotFound />
        </>)
    }
    return (
        <PostContext.Provider value={{ post, images, comments, setComments, getComments }}>
            <div className="lg:px-32">
                <MyBreadCrumb BreadCrumbName={post.title} />
                <div className="grid grid-cols-7 gap-5">
                    <div className="col-span-5">
                        <PostContent />
                    </div>
                    <div className="col-span-2 flex flex-col gap-5">
                        <UserCard />
                        <PostComment />
                    </div>
                </div>
                <RecommendList recommentList={recommentList} title="Phòng trọ gần đó" url={`/posts?location=${post.postRentDetail.motelId.fullLocation}&page=1&latitude=${post.postRentDetail.motelId.locationLatitude}&longitude=${post.postRentDetail.motelId.locationLongitude}`}/>
            </div>
        </PostContext.Provider>
    );
};

export default PostDetail;