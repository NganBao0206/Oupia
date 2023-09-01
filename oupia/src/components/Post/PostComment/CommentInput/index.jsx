import { Avatar, Button, Label, Textarea } from "flowbite-react";
import { useContext, useState } from "react";
import { UserContext } from "../../../../App";
import { PostContext } from "../../../../pages/Post/PostDetail";
import { authApi, endpoints } from "../../../../configs/APIs";

const CommentInput = () => {
    const { post } = useContext(PostContext);
    const [content, setContent] = useState("");
    const [currentUser,] = UserContext(UserContext);

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
                if (res.status === 200) {
                    console.log(res.data);
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
                    <Avatar className="w-fit" alt="User Avatar" img={currentUser.avatar} size="md" />
                    <div className="flex-grow mr-2">
                        <div className=" block">
                            <Label
                                htmlFor="comment"
                                value=""
                            />
                        </div>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            id="comment"
                            placeholder="Hãy viết gì đó ..."
                            required
                            type=""
                            rows={1}
                        />
                    </div>
                    <div className="w-fit">
                        <Button onClick={sendComment} color="dark" className="ring-0">Gửi</Button>
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