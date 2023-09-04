import React, { useContext } from 'react';
import { PiUserFocusLight, PiIdentificationCardThin, PiUserRectangleThin, PiClipboardText } from "react-icons/pi";
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { CiMail } from 'react-icons/ci';
import { FormContext } from '../../../pages/Register';


const RegisterStepper = (props) => {
    const { user } = useContext(props.context);

    if (user.userRole === "TENANT") {
        return (<>
            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ml-6">
                    {props.step > 0 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <PiUserFocusLight className="text-Dark" size="20" />
                    </span>}

                    <h3 className={`${props.step > 0 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Loại người dùng</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
                <li className="mb-10 ml-6">
                    {props.step > 1 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <PiIdentificationCardThin className="text-Dark" size="20" />
                    </span>}
                    <h3 className={`${props.step > 1 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Thông tin người dùng</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
                <li className="mb-10 ml-6">
                    {props.step > 2 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <PiUserRectangleThin className="text-Dark" size="20" />
                    </span>}
                    <h3 className={`${props.step > 2 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Thông tin tài khoản</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
                <li className="ml-6">
                    {props.step > 5 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <CiMail className="text-Dark" size="20" />
                    </span>}
                    <h3 className={`${props.step > 5 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Xác nhận Email</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
            </ol>
        </>);
    } else if (user.userRole === "LANDLORD") {
        return (<>
            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ml-6">
                    {props.step > 0 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <PiUserFocusLight className="text-Dark" size="20" />
                    </span>}

                    <h3 className={`${props.step > 0 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Loại người dùng</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
                <li className="mb-10 ml-6">
                    {props.step > 1 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <PiIdentificationCardThin className="text-Dark" size="20" />
                    </span>}
                    <h3 className={`${props.step > 1 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Thông tin người dùng</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
                <li className="mb-10 ml-6">
                    {props.step > 2 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <PiUserRectangleThin className="text-Dark" size="20" />
                    </span>}
                    <h3 className={`${props.step > 2 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Thông tin tài khoản</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
                <li className="mb-10 ml-6">
                    {props.step > 3 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <HiOutlineHomeModern className="text-Dark" size="20" />
                    </span>}
                    <h3 className={`${props.step > 3 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Thêm nhà trọ</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
                <li className="mb-10 ml-6">
                    {props.step > 4 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <PiClipboardText className="text-Dark" size="20" />
                    </span>}
                    <h3 className={`${props.step > 4 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Đăng bài viết</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
                <li className="ml-6">
                    {props.step > 5 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                        <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <CiMail className="text-Dark" size="20" />
                    </span>}
                    <h3 className={`${props.step > 5 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Xác nhận Email</h3>
                    <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
                </li>
            </ol>
        </>)
    }

    return (<>
        <ol className="relative text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <li className="mb-10 ml-6">
                {props.step > 0 ? <span className="absolute flex items-center justify-center w-8 h-8 bg-blueTemplate rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blueTemplate">
                    <svg className="w-3.5 h-3.5 text-white dark:text-white" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                </span> : <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <PiUserFocusLight className="text-Dark" size="20" />
                </span>}

                <h3 className={`${props.step > 0 ? "text-blueTemplate" : ""} font-medium leading-tight ml-3`}>Loại người dùng</h3>
                <p className="text-sm ml-3 hover:text-white cursor-pointer">Xem thông tin</p>
            </li>
        </ol>
    </>);
};

export default RegisterStepper;