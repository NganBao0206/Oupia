import { Spinner } from 'flowbite-react';
import React from 'react';

const MySpinner = () => {
    return (
        <>
            <Spinner size="xl" className=" fill-blueTemplate mt-20" />
            <h1 className="text-lg font-bold text-blueTemplate mt-2">Đang tải</h1>
        </>
    );
};

export default MySpinner;