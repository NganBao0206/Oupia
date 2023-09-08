import { Card } from 'flowbite-react';
import React, { Fragment, useContext } from 'react';
import './style.scss'
import MyBreadCrumb from '../../components/MyBreadCrumb';
import TenantForm from '../../components/Form/TenantForm';
import LandlordForm from '../../components/Form/LandlordForm';
import { UserContext } from '../../App';

const Upload = () => {
    const [currentUser,] = useContext(UserContext);

    return (
        <Fragment>
            <div className="container">
                <MyBreadCrumb BreadCrumbName="Đăng tin" />
                <Card className="w-full my-10 items-center my-card">
                    {currentUser.userRole === "TENANT" ? <TenantForm /> : <LandlordForm />}
                </Card>
            </div>
        </Fragment>)
};

export default Upload;