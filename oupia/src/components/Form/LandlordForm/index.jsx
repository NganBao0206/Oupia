import { Button } from 'flowbite-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import StepOne from './StepOneLandlordForm';
import StepTwo from './StepTwoLandlordForm';
import StepThree from './StepThreeLandlordForm';
import LandlordStepper from '../../Stepper/LandlordStepper';
import APIs, { authApi, endpoints } from '../../../configs/APIs';
import { UserContext } from '../../../App';

export const LandlordFormContext = createContext();

const LandlordForm = () => {
    const [component, setComponent] = useState();
    const [step, setStep] = useState(0);

    const [currentUser,] = useContext(UserContext);
    const [post, setPost] = useState({
        userId: currentUser,
    });
    const [postRentDetail, setPostRentDetail] = useState({});
    const [postImages, setPostImages] = useState([]);

    const [motels, setMotels] = useState(null);

    useEffect(() => {
        let getMotels = async () => {
            try {
                let res = await APIs.get(endpoints['motels'], {
                    params: {
                        username: currentUser.username,
                        isAccepted: "ACCEPTED",
                        isDelete: 0,
                    }
                });
                if (res.status === 200) {

                    setMotels(res.data);
                }

            } catch (err) {
                console.error(err);
            }
        }
        getMotels();
    }, [])

    const handleNextStep = () => {
        setStep(prev => prev + 1);
    }

    const handlePrevStep = () => {
        if (step !== 0)
            setStep(prev => prev - 1);
    }

    useEffect(() => {
        const components = [<StepOne context={LandlordFormContext} />,
        <StepTwo context={LandlordFormContext} />,
        <StepThree context={LandlordFormContext} />];
        setComponent(components[step])
    }, [step])

    useEffect(() => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.setAttribute('disabled', true));
        setTimeout(() => {
            buttons.forEach(button => button.removeAttribute('disabled'));
        }, 1000);
    }, [component])


    const addPost = async (e) => {
        e.preventDefault();
        if (step < 2) {
            return;
        }
        let form = new FormData();
        form.append('post', JSON.stringify(post));
        form.append('postRentDetail', JSON.stringify(postRentDetail));
        postImages.forEach((file) => {
            form.append('files', file);
        });

        // setLoading(true)
        let res = await authApi().post(endpoints['posts'], form, {
            headers: {
                "Custom-Header": "value",
            }
        });
        if (res.status === 201) {
            console.log("success");
        }
    }

    return (<>
        <LandlordFormContext.Provider value={{ motels, postImages, setPostImages, postRentDetail, setPostRentDetail, post, setPost }}>
            <LandlordStepper step={step} />
            <form className="gap-4 mt-2 mx-36 mb-5" onSubmit={(e) => addPost(e)}>
                <div className="my-10 flex items-center">
                    <div className="w-full">
                        {component}
                    </div>
                </div>
                {step === 3 ? <Button onClick={handleNextStep} className="bg-blueTemplate w-full">
                    <p className="font-bold text-base">Hoàn tất</p>
                </Button> : (step !== 0 ? (
                    <div className="grid grid-cols-2 gap-5">
                        <Button onClick={handlePrevStep} className="bg-Dark text-white hover:bg-Darker">
                            <p className="font-bold text-base">Quay lại</p>
                        </Button>
                        {step > 1 ? <Button type="submit" className="bg-blueTemplate w-full">
                            <p className="font-bold text-base">Đăng bài viết</p>
                        </Button> : <Button onClick={handleNextStep} className="bg-blueTemplate w-full">
                            <p className="font-bold text-base">Tiếp tục</p>
                        </Button>}

                    </div>)
                    :
                    <Button onClick={handleNextStep} className="bg-blueTemplate w-full">
                        <p className="font-bold text-base">Tiếp tục</p>
                    </Button>)}

            </form>
        </LandlordFormContext.Provider>

    </>);
};

export default LandlordForm;