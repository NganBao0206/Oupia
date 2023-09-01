import { Avatar, Button, Label, Textarea } from "flowbite-react";
import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import { PostContext } from "../../../pages/Post/detail";
import { authApi, endpoints } from "../../../configs/APIs";
import { IoSendSharp } from "react-icons/io5";

const CommentInput = () => {
    const { post, getComments } = useContext(PostContext);
    const [content, setContent] = useState("");
    const [currentUser,] = useContext(UserContext);

    const sendComment = () => {
        if (!content)
            return;
        const comment = {
            content: content,
            postId: post,
            userId: currentUser

        }

        const addComment = async () => {
            try {
                let res = await authApi().post(endpoints["addComment"], comment);
                if (res.status === 201) {
                    getComments();
                }

            } catch (err) {
                console.error(err);
            }
        }
        addComment();
    }
    return (
        <>
            {currentUser ?
                <div className="flex gap-2 items-start w-full">
                    <Avatar className="w-fit my-1" alt="User Avatar" img={currentUser.avatar} size="md" rounded/>
                    <div className="flex-grow mr-2">
                        <div className=" block">
                            <Label
                                htmlFor="comment"
                                value=""
                            />
                        </div>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <Textarea value={content} id="comment" onChange={(e) => setContent(e.target.value)} rows={1} className="block w-full px-4 py-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập bình luận" />
                            <button onClick={sendComment} type="submit" className="text-white absolute right-2.5 bottom-1/2 translate-y-1/2 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-2 py-2"><IoSendSharp className="text-blueTemplate" size={25}/></button>
                        </div>
                    </div>
                </div>
                :
                <div className="flex w-full">
                    Đăng nhập để bình luận
                </div>
            }
        </>
    )
}

export default CommentInput;