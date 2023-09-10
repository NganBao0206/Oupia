import React, { useContext, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { UserContext } from '../../../../App';
import { authApi, endpoints } from '../../../../configs/APIs';
import { PostFindContext } from '../../../Post/PostFindItem';

const CommentInput = (props) => {
    const { post } = props;
    const [currentUser,] = useContext(UserContext);
    const { setHadAdd, inputRef} = useContext(PostFindContext);
    const [content, setContent] = useState("");

    const sendComment = (evt) => {
        evt.preventDefault();
        if (!content)
            return;
        const comment = {
            content: content,
            postId: post,
        }

        const addComment = async () => {
            try {
                let res = await authApi().post(endpoints["addComment"], comment);
                if (res.status === 201) {
                    setContent("");
                    setHadAdd(true);
                }

            } catch (err) {
                console.error(err);
            }
        }
        addComment();
    }
    return (<>
        {
            currentUser ? <div className="flex gap-5 items-center mt-5">
                <div className="w-14 h-14" >
                    <img
                        src={currentUser.avatar}
                        alt="Avatar"
                        className="w-full h-full rounded-full"
                    />
                </div >
                <form onSubmit={(evt) => sendComment(evt)} className="relative w-full">
                    <input ref={inputRef} value={content} onChange={(evt) => setContent(evt.target.value)} type="text" className="block w-full px-4 py-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blueTemplate dark:focus:border-blue-500" placeholder="Viết bình luận..." />
                    <button type="submit" className=" absolute right-2.5 bottom-1/2 translate-y-1/2 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-2 py-2"><IoSendSharp className="text-blueTemplate" size={25} /></button>
                </form>
            </div > : <></>
        }

    </>);
};

export default CommentInput;