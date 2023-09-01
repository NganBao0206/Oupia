import { Button } from 'flowbite-react';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StepOne from '../../components/Form/Register/StepOneRegister';
import StepTwo from '../../components/Form/Register/StepTwoRegister';
import StepThree from '../../components/Form/Register/StepThreeRegister';
import StepFour from '../../components/Form/AddMotelForm';
import StepFive from '../../components/Form/LandlordForm/StepTwoLandlordForm';
import StepSix from '../../components/Form/LandlordForm/StepThreeLandlordForm';
import LastStep from '../../components/Form/Register/StepFourRegister';
import RegisterStepper from "../../components/Stepper/RegisterStepper";
import APIs, { endpoints } from '../../configs/APIs';

export const FormContext = createContext();

const Register = () => {
    const [component, setComponent] = useState();
    const [components, setComponents] = useState([<StepOne />]);

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isEnable, setIsEnable] = useState(false);
    const nav = useNavigate();

    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(null);
    const avatarFile = useRef();

    const handleNextStep = () => {
        if (step === 0 && !user.role) {
            return;
        }
        if (step !== 3)
            setStep(prev => prev + 1);
    }

    const handlePrevStep = () => {
        if (step !== 0)
            setStep(prev => prev - 1);
    }

    useEffect(() => {
        if (user.role === "TENANT") {
            setComponents([<StepOne />, <StepTwo />, <StepThree />, <LastStep />]);
        } else if (user.role === "LANDLORD") {
            setComponents([<StepOne />, <StepTwo />, <StepThree />, <StepFour />, <StepFive />, <StepSix />, <LastStep />]);
        }
        setComponent(components[step])
        if (user.username && user.password && user.confirmPass && avatarFile) {
            setIsEnable(true);
        }
    }, [step])

    const register = (evt) => {
        evt.preventDefault();
        if (step < 2)
            return;
        const process = async () => {
            let form = new FormData();

            for (let field in user)
                if (field !== "confirmPass")
                    form.append(field, user[field]);

            form.append("avatar", avatarFile.current.files[0]);

            setLoading(true)
            let res = await APIs.post(endpoints['register'], form);
            if (res.status === 201) {
                nav("/login");
            }
        }

        if (user.password === user.confirmPass)
            process();
        else {
        }
    }

    return (<>
        <FormContext.Provider value={{ user, setUser, avatar, setAvatar, avatarFile }}>
            <div className="h-screen">
                <div className="grid grid-cols-3 rounded-xl border shadow-lg m-20">
                    <div className=" col-span-1 bg-Dark flex items-center h-full rounded-l-xl py-24">
                        <div className=" flex flex-col mx-auto">
                            <h1 className="text-3xl text-white mb-10">Đăng ký người dùng</h1>
                            <RegisterStepper step={step} />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <form onSubmit={register} className="gap-4 mt-2 mx-36">
                            <div className="my-10 flex items-center">
                                <div className="w-full">
                                    {component}
                                </div>
                            </div>
                            {step !== 0 ? (
                                <div className="grid grid-cols-2 gap-5">
                                    <Button onClick={handlePrevStep} className="bg-Dark text-white hover:bg-Darker">
                                        <p className="font-bold text-base">Quay lại</p>
                                    </Button>
                                    {step === 2 ? <Button onClick={handleNextStep} className="bg-blueTemplate w-full">
                                        <p className="font-bold text-base">Hoàn tất</p>
                                    </Button> : <Button onClick={handleNextStep} type="button" className="bg-blueTemplate w-full">
                                        <p className="font-bold text-base">Tiếp tục</p>
                                    </Button>}

                                </div>)
                                :
                                <Button onClick={handleNextStep} className="bg-blueTemplate w-full">
                                    <p className="font-bold text-base">Tiếp tục</p>
                                </Button>}
                        </form>
                        <hr className=" h-px my-10 mx-20 bg-gray-200 border-0 dark:bg-gray-700" />
                        <p className="font-thin mb-10 mx-auto text-gray-900">Bạn có tài khoản? <Link to="/login" className="font-bold">Đăng nhập</Link></p>
                    </div>
                </div>
            </div>
        </FormContext.Provider>
    </>);
};

export default Register;
