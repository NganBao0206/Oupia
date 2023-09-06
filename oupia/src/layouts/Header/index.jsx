import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import imgLogo from "../../resources/logoOupia.svg";
import { Link, NavLink, useLocation } from 'react-router-dom';
import "./style.scss";
import { useContext, useEffect, useState } from 'react';
import { PiBell } from "react-icons/pi"
import { BsBookmark, BsChat } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { LuSettings } from "react-icons/lu";
import { UserContext } from '../../App';


const Header = () => {
    // User Profile or SignIn Button

    const [user, dispatch] = useContext(UserContext);

    // Background Color & Scroll

    const [bgColor, setBgColor] = useState(false);
    const location = useLocation();
    const bgTrans = (location.pathname === '/' || location.pathname === '/login');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setBgColor(true);
            } else {
                setBgColor(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const logOut = () => {
        dispatch({
            "type": "logout"
        })
    }

    return (
        <>
            <div className={`${bgTrans ? (bgColor ? "bg-header shadow-sm border-b border-gray-200" : "header") : "bg-header shadow-sm border-b border-gray-200"}`} >
                <Navbar
                    fluid
                    rounded className="py-5 bg-transparent">
                    <Navbar.Brand className="mr-5">
                        <Link to="/">
                            <img
                                alt="logo"
                                className="mr-3 h-6 sm:h-9"
                                src={imgLogo}
                            />
                        </Link>
                        <Link to="/">
                            <p className="self-center whitespace-nowrap text-2xl text-blueTemplate font-bold dark:text-white">
                                Oupia
                            </p>
                        </Link>
                    </Navbar.Brand>
                    {!user ? (<div className="flex md:order-2 items-center">
                        <Link to="/register" className="mr-5">
                            Đăng ký
                        </Link>
                        <Link to="/login">
                            <Button color="dark">Đăng nhập</Button>
                        </Link>
                    </div>) : (<div className="flex md:order-2 items-center">
                        <BsBookmark size="20" className={`mr-4 ${bgTrans ? (bgColor ? "text-Dark" : "text-white") : "text-Dark"}`} />
                        <BsChat size="20" className={`mr-3  ${bgTrans ? (bgColor ? "text-Dark" : "text-white") : "text-Dark"}`} />
                        <PiBell size="24" className={`mr-4 ${bgTrans ? (bgColor ? "text-Dark" : "text-white") : "text-Dark"}`} />
                        <Dropdown
                            arrowIcon={null}
                            inline
                            label={<Avatar className="" alt="Avatar" img={user.avatar} rounded />}
                            className=""
                        >
                            <Dropdown.Header>
                                <Avatar size="lg" className="w-full my-3 h-20" alt="Avatar" img={user.avatar} rounded />
                                <span className="block text-lg text-center">
                                    {user.fullName}
                                </span>
                                <span className="block text-sm text-gray-500 text-gray text-center">
                                    @{user.username}
                                </span>
                            </Dropdown.Header>
                            <Link to={`/${user.username}`} className="hover:text-white">
                                <div className="items-center px-8 py-3 flex p-2 hover:bg-Dark ">
                                    <AiOutlineUser size="20" className="mr-2" />
                                    <p className="text-sm">Trang cá nhân</p>
                                </div>
                            </Link>
                            <Link to="" className="hover:text-white">
                                <div className="items-center px-8 py-3 flex p-2 hover:bg-Dark ">
                                    <LuSettings size="20" className="mr-2" />
                                    <p className="text-sm">Cài đặt</p>
                                </div>
                            </Link>
                            <div onClick={logOut} className="hover:text-white hover:cursor-pointer">
                                <div className="items-center px-8 py-3 flex p-2 hover:bg-Dark ">
                                    <FiLogOut size="20" className="mr-2" />
                                    <p className="text-sm">Đăng xuất</p>
                                </div>
                            </div>
                        </Dropdown>
                    </div>)}


                    <Navbar.Collapse >
                        <NavLink to="/" className="nav-item text-lg">
                            Trang chủ
                        </NavLink>
                        <NavLink to="/upload" className="nav-item text-lg">
                            Đăng tin
                        </NavLink>
                        <NavLink to="/posts" className="nav-item text-lg">
                            Bài viết
                        </NavLink>
                        <NavLink to="/forum" className="nav-item text-lg">
                            Diễn đàn
                        </NavLink>
                        <NavLink to="/manager" className="nav-item text-lg">
                            Quản lý
                        </NavLink>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            {bgTrans ? <></> : <div className="py-9 mt-3"></div>}
        </>

    );
};

export default Header;