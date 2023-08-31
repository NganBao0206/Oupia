import Header from './layouts/Header/index';
import Home from './pages/Home/index';
import Footer from './layouts/Footer/index';
import UserLayout from './layouts/UserLayout/index';

import SignUp from './pages/Login/signUp';
import Login from './pages/Login/login';
import Upload from './pages/Upload/index';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./App.css"
import NotFound from './pages/NotFound';
import { createContext, useEffect, useReducer } from 'react';
import UserReducer from './reducers/UserReducer';
import cookie from "react-cookies";
import Motels from './pages/Motel/motels';
import UserPosts from './pages/User/posts';
import UserFavourite from './pages/User/favorite';
import UserPhotos from './pages/User/photos';
import Post from './pages/Post/detail';
import Posts from './pages/Post/posts';
import { v4 as uuid} from 'uuid';

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
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/posts/" element={<Posts />}></Route>

            <Route path="/posts/:slugPost" element={<Post />}></Route>
            <Route path="/:slugUser" element={<UserLayout />}>
              <Route index element={<UserPosts />} />
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
