import React from 'react';
import SignUpFrom from '../../components/Form/signup';
import "./style.scss";

const SignUp = () => {
    return (
        <div className="h-screen flex items-center pb-20">
            <SignUpFrom/>
        </div>
    );
};

export default SignUp;