import { Label, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { BiImageAdd } from "react-icons/bi";
import { FormContext } from '../../../../pages/Register';

const StepThreeRegister = ({context}) => {

    const {user, setUser, avatar, setAvatar, setAvatarFile} = useContext(context);

    const changeUser = (value, field) => {
        setUser(current => {
            return {...current, [field] : value}
        })
    }

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileURL = URL.createObjectURL(file);
            setAvatar(fileURL);
            setAvatarFile(event.target.files);
        }
    };

    return (
        <>
            <div className="w-40 h-40 ring-[5px] ring-white rounded-full shadow-xl mx-auto relative">
                <img
                    src={avatar? avatar : 'https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg'}
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
                <TextInput id="username" name="username" value={user.username} required shadow type="text" onChange={e => changeUser(e.target.value, e.target.name)} />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg mt-2" htmlFor="password" value="Mật khẩu" />
                    </div>
                    <TextInput id="password" name="password" value={user.password} required shadow type="password"  onChange={e => changeUser(e.target.value, e.target.name)} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-lg mt-2" htmlFor="confirmPass" value="Xác nhận mật khẩu" />
                    </div>
                    <TextInput id="confirmPass" name="confirmPassword" value={user.confirmPassword} required  shadow type="password"  onChange={e => changeUser(e.target.value, e.target.name)}/>
                </div>
            </div>

        </>
    );
};

export default StepThreeRegister;