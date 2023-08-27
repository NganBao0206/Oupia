import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPosts from '../pages/User/posts';
import UserFavourite from '../pages/User/favorite';
import UserPhotos from '../pages/User/photos';
import UserLayout from '../layouts/UserLayout';
import NotFound from '../pages/NotFound';

const UserRoutes = () => {
    return (<>
        <Routes>
            <Route index element={<UserLayout component={UserPosts} />} />
            <Route index path="/posts" element={<UserLayout component={UserPosts} />} />
            <Route path="/favourites" element={<UserLayout component={UserFavourite} />} />
            <Route path="/photos" element={<UserLayout component={UserPhotos} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>);
};

export default UserRoutes;