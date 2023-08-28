import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPosts from '../pages/User/posts';
import UserFavourite from '../pages/User/favorite';
import UserPhotos from '../pages/User/photos';
import NotFound from '../pages/NotFound';

const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<UserPosts />} />
      <Route path="posts" element={<UserPosts />} />
      <Route path="favourites" element={<UserFavourite />} />
      <Route path="photos" element={<UserPhotos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;