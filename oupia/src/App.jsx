import Header from './layouts/Header/index';
import Home from './pages/Home/index';
import Footer from './layouts/Footer/index';
import SignUp from './pages/Login/signUp';
import Login from './pages/Login/login';
import Upload from './pages/Upload/index';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./App.css"
import NotFound from './pages/NotFound';
import UserRoutes from './router/UserRoutes';
import PostRoutes from './router/PostRoutes';
import { createContext, useReducer } from 'react';
import UserReducer from './reducers/UserReducer';
import cookie from "react-cookies";
import Motels from './pages/Motel/motels';

export const UserContext = createContext();


const App = () => {
  const [user, dispatch] = useReducer(UserReducer, cookie.load("user") || null);

  return (
    <>
      <UserContext.Provider value={[user, dispatch]}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/motels" element={<Motels/>} />
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/:slugUser/*" element={<UserRoutes />} />
            <Route path="/posts/*" element={<PostRoutes />}></Route>
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
