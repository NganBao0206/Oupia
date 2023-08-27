import { Button } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StepOne from './SignUp/stepOne';
import StepTwo from './SignUp/stepTwo';
import StepThree from './SignUp/stepThree';
import SignUpStepper from '../Stepper/signup';
import StepFour from './SignUp/stepFour';
import APIs, { endpoints } from '../../configs/APIs';

const SignUpFrom = () => {
    const [component, setComponent] = useState();
    const [step, setStep] = useState(0);
    const [user, setUser] = useState({
        role: null,
        fullName: null,
        dob: null,
        gender: null,
        identity: null,
        email: null,    
        username: null,
        password: null,
        comfirmPass: null,
        avatar: null,
    });

    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleNextStep = () => {
        if (step === 0 && user.role === null) {
            return;
        }
        setStep(prev => prev + 1);
    }

    const handlePrevStep = () => {
        if (step !== 0)
            setStep(prev => prev - 1);
    }

    const handleInputChange = (field, value) => {
        setUser(prevUser => ({ ...prevUser, [field]: value }));
    }

    const handleFileChange = (file, fileURL) => {
        setUser(prevUser => ({ ...prevUser, avatar: file }));
    }

    useEffect(() => {
        const components = [<StepOne onRoleChange={(value) => handleInputChange('role', value)} selectedRole={user.role} />,
        <StepTwo onInputChange={handleInputChange} user={user} />,
        <StepThree onInputChange={handleInputChange} onFileChange={handleFileChange} user={user} />,
        <StepFour user={user} />];
        console.log(user)
        setComponent(components[step])
    }, [step, user])


    const register = (evt) => {
        evt.preventDefault();

        const process = async () => {
            let formData = new FormData();
            for (let field in user) {
                formData.append(field, user[field]);
            }
            let res = await APIs.post(endpoints['register'], formData);

            if (res === 201) {
                nav("/login");
            } else {

            }
        }

        process();
    }

    return (
        <div className="grid grid-cols-3 w-screen mx-20 rounded-xl border shadow-lg">
            <div className=" col-span-1 bg-Dark flex items-center h-full rounded-l-xl">
                <div className=" flex flex-col mx-auto">
                    <h1 className="text-3xl text-white mb-10">Đăng ký người dùng</h1>
                    <SignUpStepper step={step} />
                </div>
            </div>
            <div className="col-span-2 flex flex-col">
                <form onSubmit={register} className="gap-4 mt-2 mx-36">
                    <div className="my-10 flex items-center" style={{ height: "450px" }}>
                        <div className="w-full">
                            {component}
                        </div>
                    </div>
                    {step !== 0 ? (
                        <div className="grid grid-cols-2 gap-5">
                            <Button onClick={handlePrevStep} className="bg-Dark text-white hover:bg-Darker">
                                <p className="font-bold text-base">Quay lại</p>
                            </Button>
                            {step === 3 ? <Button type="submit" className="bg-blueTemplate w-full">
                                <p className="font-bold text-base">Tiếp tục</p>
                            </Button> : <Button onClick={handleNextStep} className="bg-blueTemplate w-full">
                                <p className="font-bold text-base">Tiếp tục</p>
                            </Button>}

                        </div>)
                        :
                        <Button onClick={handleNextStep} className="bg-blueTemplate w-full">
                            <p className="font-bold text-base">Tiếp tục</p>
                        </Button>}

                </form>
                <hr class=" h-px my-10 mx-20 bg-gray-200 border-0 dark:bg-gray-700" />
                <p className="font-thin mb-10 mx-auto text-gray-900">Bạn có tài khoản? <Link to="/login" className="font-bold">Đăng nhập</Link></p>
            </div>
        </div>

    );
};

export default SignUpFrom;
