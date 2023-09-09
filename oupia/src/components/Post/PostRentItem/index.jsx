import { Avatar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { PiStarBold, PiDotBold } from "react-icons/pi";
import { HiOutlineLocationMarker, HiOutlineArrowRight } from "react-icons/hi";
import formatCurrency from '../../../utils/priceUtils';
import { LiaHomeSolid } from "react-icons/lia";

const PostRentItem = (props) => {
    const { post } = props;
    const price = formatCurrency(post.postRentDetail.price);


    return (<>
        <div className="w-full lg:h-96 h-auto bg-white rounded-xl shadow-lg overflow-hidden my-16 text-Dark relative">
            <div className="grid grid-cols-10 h-full">
                <div className="col-span-10 lg:col-span-4">
                    <img className="h-80 w-full object-cover lg:h-full" src={post.image} alt="postimage" />
                </div>
                <div className="col-span-10 lg:col-span-6 px-8 py-3 mt-4 lg:mt-0">
                    <div className="flex gap-4 mb-3 items-center">
                        <Avatar className="" alt="Avatar" img={post.userId.avatar} rounded />
                        <div>
                            <p className="font-bold text-sm">{post.userId.fullName}</p>
                            <p className="text-sm text-gray-500">Vai giay truoc</p>
                        </div>
                    </div>
                    <div className="text-lg uppercase font-bold mt-5 tracking-wide font-semibold mb-2 text-Dark line-clamp-1">{post.title}</div>
                    <h1 className="text-blueTemplate text-lg">Giá: {price}đ/tháng</h1>
                    <div className="flex mt-1 items-center">
                        <div className="flex text-blueTemplate gap-2">
                            <PiStarBold />
                            <p className="text-sm">4.5 <span>(128)</span></p>
                        </div>
                        <PiDotBold size="24" className="mx-3 text-Dark"/>
                        <div className="flex gap-2">
                            <LiaHomeSolid size="17"/>
                            <p className="text-sm">{post.postRentDetail.motelId.name}</p>
                        </div>
                    </div>
                    <Link href="#" className="block mt-1 text-lg leading-tight font-medium hover:underline text-Dark flex gap-3 mt-2">
                        <HiOutlineLocationMarker />
                        <p className="text-sm">{post.postRentDetail.motelId.fullLocation}</p>
                    </Link>
                    <p className="mt-3 text-gray-500 line-clamp-3 text-justify text-sm">{post.description}</p>
                    <Link to={`/posts/${post.slug}`} className="absolute right-6 bottom-6">
                        <Button className="bg-blueTemplate">
                            <p>
                                Xem chi tiết
                            </p>
                            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    </>)

}

export default PostRentItem;