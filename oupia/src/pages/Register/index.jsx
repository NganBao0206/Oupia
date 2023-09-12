import { Button, Spinner } from 'flowbite-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import StepOne from '../../components/Form/Register/StepOneRegister';
import StepTwo from '../../components/Form/Register/StepTwoRegister';
import StepThree from '../../components/Form/Register/StepThreeRegister';
import StepFour from '../../components/Form/AddMotelForm';
import StepFive from '../../components/Form/LandlordForm/StepThreeLandlordForm';
import StepSix from '../../components/Form/LandlordForm/StepTwoLandlordForm';
import RegisterStepper from "../../components/Stepper/RegisterStepper";
import APIs, { endpoints } from '../../configs/APIs';
import { UserContext } from '../../App';
import { schemaMotel, schemaPost, schemaPostRentDetail, schemaUser } from '../../validators/yupValidators';
import MySpinner from '../../components/MySpinner';

export const FormContext = createContext();


const Register = () => {
    const [currentUser,] = useContext(UserContext);
    const [component, setComponent] = useState();
    const [components, setComponents] = useState([<StepOne context={FormContext} />]);

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [, setIsEnable] = useState(false);
    const nav = useNavigate();

    const [user, setUser] = useState({});
    const [validate, setValidate] = useState({});
    const [motel, setMotel] = useState({});
    const [post, setPost] = useState({});
    const [postRentDetail, setPostRentDetail] = useState({});

    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [postImages, setPostImages] = useState([]);
    const [errors, setErrors] = useState({});




    const handleNextStep = () => {
        if (step === 0 && !user.userRole) {
            return;
        }
        if (step === 1 && !user.userRole) {
            return;
        }
        if (step !== components.length - 1)
            setStep(prev => prev + 1);

    }

    const handlePrevStep = () => {
        if (step !== 0)
            setStep(prev => prev - 1);
    }

    useEffect(() => {
        setComponent(components[step])
    }, [step])

    useEffect(() => {
        if (user.username && user.password && user.confirmPass && avatarFile) {
            setIsEnable(true);
        }
    }, [user.username, user.password, user.confirmPass, avatarFile])

    useEffect(() => {
        if (user.userRole === "TENANT") {
            setComponents([
                <StepOne context={FormContext} />,
                <StepTwo context={FormContext} />,
                <StepThree context={FormContext} />]);
        } else if (user.userRole === "LANDLORD") {
            setComponents([
                <StepOne context={FormContext} />,
                <StepTwo context={FormContext} />,
                <StepThree context={FormContext} />,
                <StepFour context={FormContext} />,
                <StepFive context={FormContext} />,
                <StepSix context={FormContext} />,
            ]);
        }
    }, [user.userRole])

    useEffect(() => {
        const validateAll = async () => {
            let schemas = [schemaUser, schemaPost, schemaPostRentDetail, schemaMotel];
            let data = [user, post, postRentDetail, motel];
            let dataNames = ['user', 'post', 'postRentDetail', 'motel'];

            if (user.userRole === "TENANT") {
                schemas = [schemaUser];
                data = [user];
                dataNames = ['user'];
            }

            setErrors({});

            for (let i = 0; i < schemas.length; i++) {
                try {
                    await schemas[i].validate(data[i], { abortEarly: false });
                } catch (error) {
                    const errorMessages = {};
                    error.inner.forEach(err => {
                        errorMessages[err.path] = err.message;
                    });
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [dataNames[i]]: errorMessages
                    }));
                }
            }
        };

        validateAll();
    }, [user, post, postRentDetail, motel, user.userRole]);


    const register = async (evt) => {
        evt.preventDefault();
        setLoading(true);

        if (step < components.length - 1)
            return;

        if (Object.keys(errors).length > 0 || !avatarFile || !user.userRole || (user.userRole === "LANDLORD" && postImages.length < 3)) {
            alert("Thông tin đăng ký chưa hợp lệ, vui lòng kiểm tra trước khi hoàn tất");
            setLoading(false);
            return;
        }

        const url = endpoints.userInfo(user.username);

        let res = await APIs.get(url);
        if (res.status === 200) {
            alert("Tên người dùng đã tồn tại, vui lòng chọn tên khác");
            setLoading(false);
            return;
        }
        else {
            const process = async () => {
                let form = new FormData();
                if (user.userRole === "LANDLORD") {
                    form.append('user', JSON.stringify(user));
                    form.append('motel', JSON.stringify(motel));
                    form.append('post', JSON.stringify(post));
                    form.append('postRentDetail', JSON.stringify(postRentDetail));


                    form.append("avatar", avatarFile[0]);
                    postImages.forEach((file) => {
                        form.append('files', file);
                    });

                    console.log(form.get("postImages"));

                    console.log(endpoints['register-landlord']);
                    let res = await APIs.post(endpoints['register-landlord'], form, {
                        headers: {
                            "Custom-Header": "value",
                        }
                    });
                    if (res.status === 201) {
                        nav("/login");
                    }
                } else {
                    for (let field in user)
                        if (field !== "confirmPass")
                            form.append(field, user[field]);

                    form.append("avatar", avatarFile[0]);

                    let res = await APIs.post(endpoints['register'], form);
                    if (res.status === 201) {
                        nav("/login");
                    }
                }
            }
            setLoading(false);
            process();
        }
    }

    if (currentUser) {
        return (<Navigate to="/" />)
    }

    return (<>
        <FormContext.Provider value={{ errors, user, setUser, avatar, setAvatar, setAvatarFile, postImages, setPostImages, motel, setMotel, postRentDetail, setPostRentDetail, post, setPost, validate, setValidate, setStep }}>

            <div className="min-h-screen">
                <div className="grid grid-cols-3 rounded-xl border shadow-lg m-20">
                    <div className=" col-span-1 bg-Dark flex items-start h-full rounded-l-xl py-24">
                        <div className=" flex flex-col mx-auto">
                            <h1 className="text-3xl text-white mb-10">Đăng ký người dùng</h1>
                            <RegisterStepper context={FormContext} step={step} />
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
                                    {step === components.length - 1 ?
                                        <>
                                            {loading === true ?
                                                <div className="mx-auto">
                                                    <Spinner size="xl" className=" fill-blueTemplate" />
                                                </div> : <Button onClick={register} className={`bg-blueTemplate w-full`}>
                                                    <p className="font-bold text-base">Hoàn tất</p>
                                                </Button>}

                                        </>
                                        : <Button onClick={handleNextStep} type="button" className="bg-blueTemplate w-full">
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
