import React from 'react';
import "./style.scss";
import formatCurrency from '../../utils/priceUtils';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';

const RecommendItem = (props) => {
    const {recomment} = props;
    const { slugPost } = useParams();

    const price = formatCurrency(recomment.postRentDetail.price)

    if (recomment.slug !== slugPost ) 
        return (
            <Link to={`/posts/${recomment.slug}`} className="shrink-0 post-item block bg-white rounded-md border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center flex-col items-stretch">
                <img className="rounded-t-md h-48 object-cover" src={recomment.image} alt="Hình ảnh" />
                <h2 className="font-bold text-lg text-Dark line-clamp-2 px-5 mt-3"> {recomment.title}</h2>
                <div className="text-blueTemplate px-5 font-bold"><h2 className="text-left">Giá: {price} VNĐ</h2></div>
                <div className="p-5 flex gap-1 text-sm">
                    <HiOutlineLocationMarker size={25}/> {recomment.postRentDetail.motelId.fullLocation}
                </div>
            </Link>
        );
};

export default RecommendItem;