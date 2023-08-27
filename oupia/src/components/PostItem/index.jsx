import { Rating } from 'flowbite-react';
import React from 'react';
import "./style.scss";
import { Link } from 'react-router-dom';

const PostItem = (props) => {
    return (
        <div className="post-item bg-white rounded-md border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center flex-col items-stretch">
            <img className="rounded-t-md h-48 object-cover" src={props.imgSource} alt="Hình ảnh" />
            <h2 className="font-bold line-clamp-2 text-left p-5"> Full nội thất cao cấp, Thang máy, Bếp, 24m2, Mới 99%</h2>
            <div className="grid grid-cols-2 text-lg text-darker px-5 font-bold"><h2 className="text-left">6.5 triệu</h2></div>
            <div className="p-5">
                <Rating>
                    <Rating.Star />
                    <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                        4.95
                    </p>
                    <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                    <Link
                        className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white mr-auto"
                        to="/">
                        <p>
                            73 reviews
                        </p>
                    </Link>
                    <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white text-right">1.42km</p>
                </Rating>
            </div>
        </div>
    );
};

export default PostItem;