import React, { useContext } from 'react';

const StepThreeLandlordForm = ({context}) => {
    const { postRentDetail, setPostRentDetail, errors} = useContext(context);
    const changePostRentDetail = (value, field) => {
        setPostRentDetail(current => {
            return { ...current, [field]: value }
        })
    }
    return (
        <>
            <div className="w-full">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-bold leading-7 text-blueTemplate">Tiện ích nhà trọ</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label htmlFor="price" className="block leading-6 text-gray-900">
                                Giá thuê trọ
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input value={postRentDetail.price}
                                    onChange={e => changePostRentDetail(e.target.value, "price")}
                                    type="text" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-36 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vd: 3000000..." required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        VND / tháng
                                    </span>
                                </div>
                            </div>
                            <p  class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.postRentDetail && errors.postRentDetail.price}</p>
                        </div>
                        <div className="sm:col-span-6 sm:col-start-1">
                            <label htmlFor="area" className="block leading-6 text-gray-900">
                                Diện tích
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input
                                    onChange={e => changePostRentDetail(e.target.value, "area")}

                                    value={postRentDetail.area} id="area" type="number" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-14 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        m²
                                    </span>
                                </div>
                            </div>
                            <p  class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.postRentDetail && errors.postRentDetail.area}</p>

                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="people" className="block leading-6 text-gray-900">
                                Số lượng người ở tối thiểu
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input
                                    onChange={e => changePostRentDetail(e.target.value, "minPeople")}

                                    value={postRentDetail.minPeople} id="people" type="number" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        người
                                    </span>
                                </div>
                            </div>
                            <p  class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.postRentDetail && errors.postRentDetail.minPeople}</p>

                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="people" className="block leading-6 text-gray-900">
                                Số lượng người ở tối đa
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input value={postRentDetail.maxPeople} 
                                onChange={e => changePostRentDetail(e.target.value, "maxPeople")}
                                id="people" type="number" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        người
                                    </span>
                                </div>
                            </div>
                            <p  class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.postRentDetail && errors.postRentDetail.maxPeople}</p>

                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="bathroom" className="block leading-6 text-gray-900">
                                Số phòng tắm
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input value={postRentDetail.numOfBathrooms}
                                onChange={e => changePostRentDetail(e.target.value, "numOfBathrooms")}
                                id="bathroom" type="number" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-24 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        phòng
                                    </span>
                                </div>
                            </div>
                            <p  class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.postRentDetail && errors.postRentDetail.numOfBathrooms}</p>

                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="bedroom" className="block leading-6 text-gray-900">
                                Số giường ngủ
                            </label>
                            <div className="relative w-full mt-2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input value={postRentDetail.numOfBedrooms}
                                onChange={e => changePostRentDetail(e.target.value, "numOfBedrooms")}
                                 id="bedroom" type="number" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-24 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                    <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                        giường
                                    </span>
                                </div>
                            </div>
                            <p  class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.postRentDetail && errors.postRentDetail.numOfBedrooms}</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StepThreeLandlordForm;