import React from 'react';
import LoginForm from '../../components/Form/login';
import "./style.scss";

const Login = () => {
    return (
        <div className="bg-login bg-cover items-center">
            <LoginForm />
        </div>
    );
};

export default Login;