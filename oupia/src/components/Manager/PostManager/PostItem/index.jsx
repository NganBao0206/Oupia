import React from 'react';
import formatCurrency from '../../../../utils/priceUtils';

const PostItem = (props) => {
    const { post , onClick} = props;
    const price = formatCurrency(post.postRentDetail.price)


    return (<>

        <div onClick={onClick} className="shrink-0 w-full bg-white rounded-md border flex gap-2 items-center flex-col items-stretch shadow-md dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
            <img className="rounded-t-md h-56 object-cover" src={post.image} alt="Hình ảnh" />
            <h2 className="font-bold text-lg text-Dark line-clamp-2 px-5 mt-3"> {post.title}</h2>
            <div className="text-blueTemplate px-5 font-bold"><h2 className="text-left">{price}đ/tháng</h2></div>
            <div className="p-5">
                hehe
            </div>
        </div>

    </>);
};

export default PostItem;