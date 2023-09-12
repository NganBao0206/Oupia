import React from 'react';
import { Link } from 'react-router-dom';
import formatCurrency from '../../../utils/priceUtils';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LiaHomeSolid } from 'react-icons/lia';

const PostMessage = (props) => {
    const { post } = props;
    const price = formatCurrency(post.postRentDetail.price);

    return (
        <Link to={`/posts/${post.slug}`}>
            <div className="w-full ml-auto">
                <div className="grid grid-cols-10 gap-2 bg-white shadow-sm border rounded">
                    <div className="col-span-4 lg:col-span-3">
                        <img src={post.image} className="object-fit h-full w-full" />
                    </div>
                    <div className="col-span-6 lg:col-span-7 p-3">
                        <h1 className="font-bold text-lg">{post.title}</h1>
                        <h1 className="text-blueTemplate text-lg">Giá: {price}đ/tháng</h1>
                        <Link href="#" className="block mt-1 text-lg leading-tight font-medium hover:underline text-Dark flex gap-3 mt-2">
                            <LiaHomeSolid size="17" />
                            <p className="text-sm">{post.postRentDetail.motelId.name}</p>
                        </Link>
                        <Link className="block mt-1 text-lg leading-tight font-medium hover:underline text-Dark flex gap-3 mt-2">
                            <HiOutlineLocationMarker />
                            <p className="text-sm">{post.postRentDetail.motelId.fullLocation}</p>
                        </Link>

                    </div>
                </div>
            </div>
        </Link>

    );
};

export default PostMessage;