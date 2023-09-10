import React from 'react';
import MyBreadCrumb from '../../components/MyBreadCrumb';
import { BiEditAlt } from 'react-icons/bi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const Settings = () => {
    const location = useLocation();
    return (<>

        <div className="lg:px-32">
            <MyBreadCrumb BreadCrumbName={location.pathname === "/settings/change-password" ? "Đổi mật khẩu" : (location.pathname === "/settings/change-info" ? "Thay đổi thông tin" : "Cài đặt")} />
            <div className="grid grid-cols-7 my-5 gap-5">
                <div className="col-span-5">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="py-5 items-center border border-gray-200 rounded-xl shadow-lg flex flex-col">
                        <h1 className="text-xl font-bold">Các danh mục cài đặt</h1>
                        <hr className="w-96 h-1 my-5" />
                        <NavLink to="/settings/change-info" className="w-full">
                            <div className=" flex gap-5 items-center px-10 py-3 hover:bg-blueTemplate/50">
                                <div className="bg-gray-200 text-Dark rounded-full items-center p-3"><BiEditAlt size="30" /></div>
                                <h2>Chỉnh sửa thông tin</h2>
                            </div>
                        </NavLink>

                        <NavLink to="/settings/change-password" className="w-full">
                            <div className=" flex gap-5 items-center px-10 py-3 hover:bg-blueTemplate/50">
                                <div className="bg-gray-200 text-Dark rounded-full items-center p-3"><HiOutlineLockClosed size="30" /></div>
                                <h2>Đổi mật khẩu</h2>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Settings;