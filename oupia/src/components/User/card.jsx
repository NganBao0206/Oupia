import { Button, Card } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss"

const UserCard = (props) => {
    const img = "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-1/350118519_479477941022130_6544855667418265188_n.jpg?stp=dst-jpg_s320x320&_nc_cat=111&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=i3JyyOmw0B0AX9xslvR&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBYMGvrA3cGTvfGGX_oUXHZRnPQS2sQipFFKhar9TLx9w&oe=64E0EB9D"

    return (
        <Card className='items-center'>
            <div className=" z-999 w-56 h-56 ring-[5px] ring-white rounded-full shadow-xl">
                <img
                    src={img}
                    alt="Avatar"
                    className="w-full h-full rounded-full"
                />
            </div>
            <div id="title" className="font-bold mt-2 mx-auto text-lg">Nguyễn Kim Bảo Ngân</div>
            <div id="stats" className="flex justify-between items-center my-4 mx-auto">
                <div className="flex flex-col items-center mr-10">
                    <div className="font-bold text-lg">172</div>
                    <div className="">Bài viết</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="font-bold text-lg">45</div>
                    <div className="">Theo dõi</div>
                </div>
            </div>
            <div id="actions" className="flex justify-center items-center">
                <Link><Button color="dark" className="font-bold mr-4">Theo dõi</Button></Link>
                <Button gradientDuoTone="purpleToPink" outline>
                    <p>
                        Nhắn tin
                    </p>
                </Button>
            </div>
        </Card >
    );
};

export default UserCard;