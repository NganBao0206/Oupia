import Header from './layouts/Header';
import Home from './pages/Home';
import Footer from './layouts/Footer';
import UserLayout from './layouts/UserLayout';

import Login from './pages/Login';
import Upload from './pages/Upload';
import Register from './pages/Register';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./App.css"
import NotFound from './pages/NotFound';
import { createContext, useEffect, useReducer } from 'react';
import UserReducer from './reducers/UserReducer';
import cookie from "react-cookies";
import Motels from './pages/Motel/motels';
import UserPosts from './pages/User/UserPosts';
import UserFavourite from './pages/User/UserFavorites';
import UserPhotos from './pages/User/UserPhotos';
import Post from './pages/Post/PostDetail';
import Posts from './pages/Post/Posts';
import { v4 as uuid} from 'uuid';
import AddMotel from './pages/Motel/AddMotel';

export const UserContext = createContext();


const App = () => {
  const [user, dispatch] = useReducer(UserReducer, cookie.load("user") || null);
  useEffect(() => {
    const newSessionToken = uuid();
    localStorage.setItem("sessionToken", newSessionToken);
  }, []);
  return (
    <>
      <UserContext.Provider value={[user, dispatch]}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/motels" element={<Motels />} />
            <Route path="/motels/add" element={<AddMotel />} />
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/" element={<Posts />}></Route>

            <Route path="/posts/:slugPost" element={<Post />}></Route>
            <Route path="/:slugUser" element={<UserLayout />}>
              <Route path="" element={<UserPosts />} />
              <Route path="posts" element={<UserPosts />} />
              <Route path="favourites" element={<UserFavourite />} />
              <Route path="photos" element={<UserPhotos />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/upload" element={<Upload />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
