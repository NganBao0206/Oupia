import { Button } from 'flowbite-react';
import React, { createContext, useEffect, useState } from 'react';
import StepOne from './StepOneLandlordForm';
import StepTwo from './StepTwoLandlordForm';
import StepThree from './StepThreeLandlordForm';
import LandlordStepper from '../../Stepper/LandlordStepper';

export const LandlordFormContext = createContext();

const LandlordForm = () => {
    const INITIAL_DATA = {

    }

    const [component, setComponent] = useState();
    const [step, setStep] = useState(0);

    const handleNextStep = () => {
        setStep(prev => prev + 1);
    }

    const handlePrevStep = () => {
        if (step !== 0)
            setStep(prev => prev - 1);
    }

    useEffect(() => {
        const components = [<StepOne />,
        <StepTwo />,
        <StepThree />];
        setComponent(components[step])


    }, [step])

    return (<>
    <LandlordFormContext.Provider>

    </LandlordFormContext.Provider>
        <LandlordStepper step={step} />
        <form className="gap-4 mt-2 mx-36 mb-5">
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
    </>);
};

export default LandlordForm;