import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import imgMail from "../../../../resources/mail.png";
import { FormContext } from '../../../../pages/Register';

const StepFourRegister = ({context}) => {
    const {user} = useContext(context);

    return (
        <div className="flex flex-col items-center mx-auto">
            <h3 className="mb-5 text-xl font-medium text-gray-700 dark:text-white">Oupia đã gửi mã đến <span className="text-blueTemplate font-bold">{user.email}</span>, hãy xác nhận để tiếp tục</h3>
            <div className="h-56 w-full flex justify-center">
                <img src={imgMail} alt="Send mail" className="h-56 w-56"/>
            </div>
            <h4 className="mt-5 text-xl font-thin text-gray-700 dark:text-white">Chưa nhận được mã? <Link className="text-blueTemplate font-bold">Gửi lại</Link><span></span></h4>
        </div>
    );
};

export default StepFourRegister;