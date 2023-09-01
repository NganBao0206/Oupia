import React from 'react';

const StepTwoLandlordForm = (props) => {
    return (
        <>
            <div className="w-full">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-bold leading-7 text-blueTemplate"> {props.add !== true ? <span>Thông tin phòng trọ</span> : <span>Chi tiết nhà trọ</span>}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label htmlFor="price" className="block leading-6 text-gray-900">
                                Giá thuê trọ
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input type="text" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-36 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vd: 3000000..." required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        VND / tháng
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="sm:col-span-3 sm:col-start-1">
                            <label htmlFor="area" className="block leading-6 text-gray-900">
                                Diện tích
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input id="area" type="number" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-14 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        m²
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="people" className="block leading-6 text-gray-900">
                                Số lượng người ở
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input id="people" type="number" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        người
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="bathroom" className="block leading-6 text-gray-900">
                                Số phòng tắm
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input id="bathroom" type="number" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-24 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        phòng
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="bedroom" className="block leading-6 text-gray-900">
                                Số giường ngủ
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input id="bedroom" type="number" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-24 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        giường
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StepTwoLandlordForm;