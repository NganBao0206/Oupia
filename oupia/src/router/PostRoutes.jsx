import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Post from '../pages/Post/detail';
import NotFound from '../pages/NotFound';
import Posts from '../pages/Post/posts';

const PostRoutes = () => {
    return (<>
        <Routes>
            <Route index path="/" element={<Posts />} />
            <Route path="/:slugPost" element={<Post/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>);
};

export default PostRoutes;