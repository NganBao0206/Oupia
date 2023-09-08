import { Avatar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { PiStarBold, PiDotBold } from "react-icons/pi";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineLocationMarker, HiOutlineArrowRight } from "react-icons/hi"
const PostRentItem = (props) => {
    const { post } = props;
    return (<>

        <div className="w-full lg:h-80 h-auto bg-white rounded-xl shadow-lg overflow-hidden my-16 text-Dark">
            <div className="grid grid-cols-10 h-full">
                <div className="col-span-10 lg:col-span-4">
                    <img className="h-80 w-full object-cover lg:h-full" src={post.image} alt="post_image" />
                </div>
                <div className="col-span-10 lg:col-span-6 px-8 py-3 mt-4 lg:mt-0">
                    <div className="flex gap-4 mb-3 items-center">
                        <Avatar className="" alt="Avatar" img={post.userId.avatar} rounded />
                        <div>
                            <p className="font-bold text-sm">{post.userId.fullName}</p>
                            <p className="text-sm text-gray-500">Vai giay truoc</p>
                        </div>
                    </div>
                    <div className="uppercase mt-5 tracking-wide text-bold font-semibold mb-2 text-Dark line-clamp-1">{post.title}</div>
                    <div className="flex mt-3">
                        <div className="flex text-blueTemplate gap-1">
                            <PiStarBold />
                            <p className="text-sm">4.5 <span>(128)</span></p>
                        </div>
                        <PiDotBold className="mx-3 text-Dark" />
                        <div className="flex gap-1">
                            <BiHomeAlt />
                            <p className="text-sm">{post.postRentDetail.motelId.name}</p>
                        </div>

                    </div>
                    <Link href="#" className="block mt-1 text-lg leading-tight font-medium hover:underline text-Dark flex gap-3 mt-2">
                        <HiOutlineLocationMarker />
                        <p className="text-sm">{post.postRentDetail.motelId.fullLocation}</p>
                    </Link>
                    <p className="mt-3 text-gray-500 line-clamp-3 text-justify text-sm">{post.description}</p>
                    <Link to={`/posts/${post.slug}`}>
                        <Button className="ms-auto bg-blueTemplate mt-6">
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