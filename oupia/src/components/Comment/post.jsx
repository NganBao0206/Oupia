import { Avatar, Button, Label, TextInput } from 'flowbite-react';
import React from 'react';

const PostComment = (props) => {
    const {user} = props
    return (
        <div className='h-full block p-5 bg-white border border-gray-200 rounded-lg shadow-md'>
            <div className="flex grid grid-cols-10 gap-2">
                <Avatar  className="col-span-2" alt="User Avatar" img={user.avatar} size="md" />
                <div className="col-span-6 mr-2">
                    <div className=" block">
                        <Label
                            htmlFor="comment"
                            value=""
                        />
                    </div>
                    <TextInput
                        id="comment"
                        placeholder="Hãy viết gì đó ..."
                        required
                        type=""
                    />
                </div>
                <div className="col-span-2">
                    <Button color="dark" className="ring-0">Gửi</Button>
                </div>
            </div>

        </div >
    );
};

export default PostComment;