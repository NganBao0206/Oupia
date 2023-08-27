import { Avatar, Button, Label, TextInput } from 'flowbite-react';
import React from 'react';

const PostComment = () => {
    const img = "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-1/350118519_479477941022130_6544855667418265188_n.jpg?stp=dst-jpg_s320x320&_nc_cat=111&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=i3JyyOmw0B0AX9xslvR&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBYMGvrA3cGTvfGGX_oUXHZRnPQS2sQipFFKhar9TLx9w&oe=64E0EB9D"

    return (
        <div className='h-full block p-5 bg-white border border-gray-200 rounded-lg shadow-md'>
            <div className="flex grid grid-cols-10 gap-2">
                <Avatar  className="col-span-2" alt="User Avatar" img={img} size="md" />
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