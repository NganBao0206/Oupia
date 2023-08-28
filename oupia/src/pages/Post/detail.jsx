import { Breadcrumb } from 'flowbite-react';
import React from 'react';
import UserCard from '../../components/User/card';
import RecommendList from '../../components/RecommendList';
import PostDetail from '../../components/PostDetail/detail';
import PostComment from '../../components/Comment/post';

const Post = () => {
    return (
        <div className="container">
            <Breadcrumb BreadCrumbName="Nhà trọ giá rẻ"/>
            <div className="grid grid-cols-7 gap-5">
                <div className="col-span-5">
                    <PostDetail />
                </div>
                <div className="col-span-2 flex flex-col gap-5">
                    <UserCard fullName="" />
                    <PostComment/>
                </div>
            </div>
            <RecommendList title="Bài đăng liên quan" />
        </div>
    );
};

export default Post;