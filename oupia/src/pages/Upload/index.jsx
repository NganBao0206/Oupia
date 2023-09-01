import { Card } from 'flowbite-react';
import React, { Fragment } from 'react';
import './style.scss'
import MyBreadCrumb from '../../components/MyBreadCrumb';
import TenantForm from '../../components/Form/TenantForm';
import LandlordForm from '../../components/Form/LandlordForm';

const Upload = () => {
    const user = {
        role: "LANDLORD",
    }

    return (
        <Fragment>
            <div className="container">
                <MyBreadCrumb BreadCrumbName="Đăng tin" />
                <Card className="w-full my-10 items-center my-card">
                    {user.role === "TENANT" ? <TenantForm /> : <LandlordForm />}
                </Card>
            </div>
        </Fragment>)
};

export default Upload;