import React, { useContext } from 'react';
import { RiSearch2Line } from "react-icons/ri";
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { FormContext } from '../../../../pages/Register';

const StepOneRegister = () => {
    const { user, setUser, setComponents } = useContext(FormContext);

    const changeUser = (value, field) => {
        setUser(current => {
            return { ...current, [field]: value }
        })
    }

    return (
        <>
            <h3 className="mb-5 text-xl font-medium text-gray-900 dark:text-white">Bạn là?</h3>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                    <input type="radio" id="role-tenant" name="role" value="TENANT" className="hidden peer" required onChange={e => changeUser(e.target.value, "userRole")} checked={user.userRole === "TENANT"} />
                    <label htmlFor="role-tenant" className="inline-flex items-center justify-between w-full p-10 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blueTemplate peer-checked:border-blueTemplate peer-checked:text-blueTemplate hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <RiSearch2Line size="35"></RiSearch2Line>
                            <div className="w-full text-xl font-bold text-Dark mt-3">Người thuê trọ</div>
                            <p className="text-gray-700 font-thin text-sm mt-3">Có thể tìm trọ, đăng bài tìm, theo dõi thông tin người cho thuê</p>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="role-landlord" name="role" value="LANDLORD" className="hidden peer" onChange={e => changeUser(e.target.value, "userRole")} checked={user.userRole === "LANDLORD"} />
                    <label htmlFor="role-landlord" className="inline-flex items-center justify-between w-full p-10 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blueTemplate peer-checked:border-blueTemplate peer-checked:text-blueTemplate hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <HiOutlineHomeModern size="35"></HiOutlineHomeModern>
                            <div className="w-full text-xl font-bold mt-3 text-Dark">Người cho thuê</div>
                            <p className="text-gray-700 font-thin text-sm mt-3">Thêm dãy nhà trọ, đăng bài cho thuê, liên hệ với người thuê </p>
                        </div>
                    </label>
                </li>
            </ul>
        </>
    );
};

export default StepOneRegister;
