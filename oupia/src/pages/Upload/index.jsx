import { Card } from 'flowbite-react';
import React, { Fragment, useContext } from 'react';
import './style.scss'
import MyBreadCrumb from '../../components/MyBreadCrumb';
import TenantForm from '../../components/Form/TenantForm';
import LandlordForm from '../../components/Form/LandlordForm';
import { UserContext } from '../../App';
import { Navigate } from 'react-router-dom';

const Upload = () => {
    const [currentUser,] = useContext(UserContext);
    if (!currentUser) {
        return (<Navigate to="/login?next=/upload" />)
    }

    return (
        <Fragment>
            <div className="relative">
                <div className="container">
                    <MyBreadCrumb BreadCrumbName="Đăng tin" />
                    <Card className="w-full my-10 items-center my-card">
                        {currentUser.userRole === "TENANT" ? <TenantForm /> : <LandlordForm />}
                    </Card>
                </div>
            </div>
        </Fragment>)
};

export default Upload;