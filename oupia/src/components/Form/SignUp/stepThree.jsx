import { Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import "../style.scss";
import { BiImageAdd } from "react-icons/bi";

const StepThree = ({ onInputChange, onFileChange, user }) => {
    const [avatarImg, setAvatarImg] = useState(user.avatar ? URL.createObjectURL(user.avatar) : 'https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg');

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileURL = URL.createObjectURL(file);
            setAvatarImg(fileURL);
            onFileChange(file, fileURL);
        }
    };

    const handleInputChange = (event) => {
        const field = event.target.id;
        const value = event.target.value;
        onInputChange(field, value);
    }

    return (
        <>
            <div className="w-40 h-40 ring-[5px] ring-white rounded-full shadow-xl mx-auto relative">
                <img
                    src={avatarImg}
                    alt="Avatar"
                    className="w-full h-full rounded-full"
                />
                <div className="absolute right-0 bottom-0">
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="avatar" className="flex items-center justify-center w-10 h-10 bg-Dark rounded-full cursor-pointer dark:hover:bg-Darker dark:bg-white hover:bg-blueTemplate dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <BiImageAdd className="text-white" size="25"></BiImageAdd>
                            <input id="avatar" type="file" className="hidden" accept='image/*' onChange={handleFileChange} />
                        </label>
                    </div>

                </div>
            </div>
            <div className="mt-5">
                <div className="mb-2 block">
                    <Label className="text-lg mt-2" htmlFor="username" value="Tên người dùng" />
                </div>
                <TextInput id="username" required value={user.username} shadow type="text" onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg mt-2" htmlFor="password" value="Mật khẩu" />
                    </div>
                    <TextInput id="password" required value={user.password} shadow type="password" onChange={handleInputChange} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg mt-2" htmlFor="confirm" value="Xác nhận mật khẩu" />
                    </div>
                    <TextInput id="confirm" required  value={user.password} shadow type="password" onChange={handleInputChange}/>
                </div>
            </div>

        </>
    );
};

export default StepThree;