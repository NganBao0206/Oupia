import React, { useState } from 'react';
import PostItem from '../PostItem';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

const PostList = (props) => {
    const { posts , onPostClick} = props;
    const [showAll, setShowAll] = useState(false);

    return (<>
        <div className="grid grid-cols-3 gap-5">
            {posts && posts.map((post, index) => (
                (showAll || index < 2) && (<PostItem post={post} onClick={() => onPostClick(post)}></PostItem>)
            ))}

            {posts && posts.length > 2 && (
                <button onClick={() => setShowAll(!showAll)} className="h-full text-blueTemplate bg-blueTemplate/25 rounded-lg shadow-md">
                    <div className="flex flex-col gap-2 items-center">
                        {!showAll ? <IoMdAdd size="30" /> : <IoMdRemove size="30" />}
                        <p className="text-lg font-bold"> {showAll ? 'Ẩn bớt' : 'Hiển thị tất cả'}</p>
                    </div>
                </button>
            )}
        </div>

    </>);
};

export default PostList;
