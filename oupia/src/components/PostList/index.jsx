const PostList = (props) => {
    const {post} = props;
    return (
        <div className="mt-10">
            <Link href="#" className="w-full h-80 grid grid-cols-12 items-center bg-white border border-gray-200 rounded-xl shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="col-span-4 rounded w-full h-full">
                    <img className="w-full h-full rounded-xl" src="https://cdn.chotot.com/HWi9ov9nbW4rdkIJWEcNk4f0nodEgzZGZ7XlHUixTVE/preset:view/plain/727692ecc8b59ba2570c42e3a68dae80-2788900471891162108.jpg" alt="" />
                </div>
                <div className="col-span-8 flex flex-col p-5">
                    <div className="flex gap-2 items-center ">
                        <h3 className="font-thin">{post.createdAt}</h3>
                    </div>
                    <h3 className="font-bold line-clamp-2 text-xl">{post.title}</h3>
                    <h2 className="font-thin line-clamp-3 text-gray-700 text-sm text-left mt-3 mb-5">
                        {post.description}
                    </h2>
                    <div  className="text-left flex font-bold items-center text-sm">
                        <LuHeart size="20" className="mr-2" />
                        <p className="mt-1">20</p>
                    </div>
                </div>
            </Link>
        </div>

    );
}

export default PostList;