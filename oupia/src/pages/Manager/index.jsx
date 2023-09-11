import React from 'react';
import MyBreadCrumb from '../../components/MyBreadCrumb';
import {     PiUserBold } from 'react-icons/pi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { BiEditAlt } from 'react-icons/bi';
import { LuEdit } from 'react-icons/lu';

const Manager = () => {
    return (
        <div className="lg:px-32">
            <MyBreadCrumb BreadCrumbName="Quản lý" />
            <div className="grid grid-cols-7 my-5 gap-5">
                <div className="col-span-5 flex flex-col gap-5">

                </div>
                <div className="col-span-2">
                    <div className="py-5 items-center border border-gray-200 rounded-xl shadow-lg flex flex-col gap-5">
                        <h1 className="text-xl font-bold">Các danh mục quản lý</h1>
                        <hr className="w-96 h-1" />
                        <div className="flex gap-5 items-center mr-auto ml-10">
                            <div className="bg-gray-200 text-Dark rounded-full items-center p-3"><PiUserBold size="30" /></div>
                            <h2>Quản lý tài khoản</h2>
                        </div>
                        <div className="flex gap-5 items-center mr-auto ml-10">
                            <div className="bg-gray-200 text-Dark rounded-full items-center p-3"><BiEditAlt size="30"/></div>
                            <h2>Chỉnh sửa thông tin</h2>
                        </div>
                        <div className="flex gap-5 items-center mr-auto ml-10">
                            <div className="bg-gray-200 text-Dark rounded-full items-center p-3"><HiOutlineLockClosed size="30" /></div>
                            <h2>Đổi mật khẩu</h2>
                        </div>
                        <div className="flex gap-5 items-center mr-auto ml-10">
                            <div className="bg-gray-200 text-Dark rounded-full items-center p-3"><LuEdit size="30" className="p-0.5"/></div>
                            <h2>Chỉnh sửa bài viết</h2>
                        </div>
                        <div className="flex gap-5 items-center mr-auto ml-10">
                            <div className="bg-gray-200 text-Dark rounded-full items-center p-3"><HiOutlineLockClosed size="30" /></div>
                            <h2>Đổi mật khẩu</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manager;