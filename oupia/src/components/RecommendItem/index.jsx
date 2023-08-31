import { Rating } from 'flowbite-react';
import React from 'react';
import "./style.scss";
import { Link } from 'react-router-dom';

const RecommendItem = (props) => {
    return (
        <div className="shrink-0 post-item bg-white rounded-md border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center flex-col items-stretch">
            <img className="rounded-t-md h-48 object-cover" src={props.imgSource} alt="Hình ảnh" />
            <h2 className="font-bold text-lg text-Dark line-clamp-2 px-5 mt-3"> Full nội thất cao cấp, Thang máy, Bếp, 24m2, Mới 99%</h2>
            <div className="text-blueTemplate px-5 font-bold"><h2 className="text-left">Giá: 6.000.000 VNĐ</h2></div>
            <div className="p-5">
                <Rating>
                    <Rating.Star />
                    <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                        4.95
                    </p>
                    <Link
                        className="ml-1 text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white mr-auto"
                        to="/">
                        <p>
                            (73)
                        </p>
                    </Link>
                    <span className=" mx-2.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                    <p className="text-sm font-bold text-gray-900 dark:text-white text-right">1.42km</p>
                </Rating>
            </div>
        </div>
    );
};

export default RecommendItem;