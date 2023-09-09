import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { UserContext } from '../../App';

const Home = () => {
    const [, setIsScrolled] = useState(false);
    const [currentUser,] = useContext(UserContext);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="object-cover h-screen bg-cover bg-home bg-gray-500 bg-blend-multiply pt-10">
                <div className="px-4 mx-auto text-center h-full w-full flex flex-col justify-center">
                    {!currentUser ? <>
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Nhà trọ sinh viên giá rẻ</h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Truy cập Oupia ngay để biết thêm về thông tin nhà trọ gần trường đại học của bạn, hãy đăng ký ngay</p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <Link to="/register" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blueTemplate hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Đăng ký ngay
                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                            <Link to="/posts" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                                Xem bài đăng nhà trọ
                            </Link>
                        </div>
                    </> : <>
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Xin chào, <span className="text-blueTemplate">{currentUser.fullName}</span></h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"></p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <Link to="/upload" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blueTemplate hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Đăng bài viết mới
                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                            <Link to="/posts" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                                Xem bài đăng nhà trọ
                            </Link>
                        </div>
                    </>}
                </div>
            </div>
        </>
    );
};

export default Home;