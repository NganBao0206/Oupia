import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import imgLogo from "../../resources/logoOupia.svg";
import { Link, NavLink, Navigate, useLocation } from 'react-router-dom';
import "./style.scss";
import { useContext, useEffect, useState } from 'react';
import { PiBell, PiClipboardText } from "react-icons/pi"
import { BsChat } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { LuSettings } from "react-icons/lu";
import { UserContext } from '../../App';
import { FaAngleDown } from 'react-icons/fa6';
import { HiOutlineHomeModern } from 'react-icons/hi2';


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
        return (<Navigate to="/login"/>)
    }

    return (<>
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
                    <Link to="/messages"><BsChat size="20" className={`mr-3  ${bgTrans ? (bgColor ? "text-Dark" : "text-white") : "text-Dark"} hover:text-blueTemplate hover:cursor-pointer`}></BsChat></Link>
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
                        <Link to="/settings" className="hover:text-white">
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

                    <NavLink to="/posts" className="nav-item text-lg">
                        Bài viết
                    </NavLink>

                    <NavLink to="/forum" className="nav-item text-lg">
                        Diễn đàn
                    </NavLink>
                    {user && (<>
                        <NavLink to="/upload" className="nav-item text-lg">
                            Đăng tin
                        </NavLink>
                        {user.userRole === "LANDLORD" ? <>
                            <Dropdown
                                arrowIcon={<FaAngleDown />}
                                inline
                                label={<h1 className="text-lg">Quản lý</h1>}
                                placement='bottom'>
                                <div>
                                    <Link to="/manager/motel" className="hover:text-white">
                                        <div className="items-center px-8 py-3 flex p-2 hover:bg-Dark ">
                                            <HiOutlineHomeModern size="20" className="mr-2" />
                                            <p className="text-sm">Nhà trọ</p>
                                        </div>
                                    </Link>
                                    <Link to="/manager/post" className="hover:text-white ">
                                        <div className="items-center px-8 py-3 flex p-2 hover:bg-Dark ">
                                            <PiClipboardText size="20" className="mr-2" />
                                            <p className="text-sm">Bài viết</p>
                                        </div>
                                    </Link>
                                </div>

                            </Dropdown>
                        </> : <></>}

                    </>)}

                </Navbar.Collapse>
            </Navbar>
        </div>
        {bgTrans ? <></> : <div className="py-9 mt-3"></div>}
    </>);
};

export default Header;