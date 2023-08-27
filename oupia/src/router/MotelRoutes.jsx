import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddMotel from '../pages/Motel/add';

const MotelRoutes = () => {
    return (
        <>
            <Routes>
                <Route index path="/" element={<Motels />} />
                <Route path="/add" element={<AddMotel />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default MotelRoutes;