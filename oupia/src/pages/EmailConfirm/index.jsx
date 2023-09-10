import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import emailImg from '../../resources/mail.png';
import { authApi, endpoints } from '../../configs/APIs';
import { Navigate } from 'react-router-dom';

const EmailConfirm = () => {
    const [currentUser,] = useContext(UserContext);
    const [isSuccess, setIsSuccess] = useState(false);


    const receiveEmail = async () => {
        try {
            const res = await authApi().get(endpoints["resend-confirm"]);
            if (res.status === 200) {
                setIsSuccess(true);
            }
        } catch (ex) {
            console.error(ex)
        }
    }

    if(!currentUser){
        return (<Navigate to="/"/>)
    }

    return (
        <div className="container h-screen flex items-center">
            <div className="w-full border border-gray-300 shadow-md my-10 p-10 rounded-lg text-center text-lg flex flex-col gap-5 mb-24">
                <h1 className="font-bold text-2xl">Xác nhận tài khoản email</h1>
                {currentUser.isConfirm === true ? "Tài khoản của bạn đã xác nhận Email rồi" : <>
                    <h1> Oupia sẽ gửi mã xác nhận qua tài khoản email <span className="text-blueTemplate font-bold">{currentUser.email}</span></h1>
                    <img className="h-1/3 w-1/3 mx-auto" src={emailImg} alt="Email" />
                    <button onClick={receiveEmail} className="p-2 w-56 mx-auto bg-blueTemplate rounded-lg text-white font-bold">
                        Nhận mã xác thực
                    </button>
                    {isSuccess === false ? <></> : <div className="absolute right-10 bottom-10">
                        <div id="toast-success" className="border border-gray-300 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="sr-only">Check icon</span>
                            </div>
                            <div className="ml-3 text-sm font-normal">Xác thực email thành công</div>
                            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                    </div>}
                </>}
            </div>
        </div>
    );
};

export default EmailConfirm;