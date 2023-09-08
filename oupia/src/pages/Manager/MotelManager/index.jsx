import React, { useContext } from 'react';
import { UserContext } from '../../../App';

const MotelManager = () => {
    const [currentUser,] = useContext(UserContext);

    return (<>

        <div className="lg:px-32 my-10">
            <div className="grid grid-cols-8 my-5 gap-5">
                <div className="col-span-5 border border-gray-200 rounded-xl shadow-lg p-10">
                    <div className="flex flex-col gap-5">
                        <h1 className="font-bold text-xl">Các dãy nhà trọ được duyệt</h1>
                    </div>
                </div>
                <div className="col-span-3 border border-gray-200 rounded-xl shadow-lg flex flex-col py-10">

                </div>
            </div>
        </div>

    </>);
};

export default MotelManager;