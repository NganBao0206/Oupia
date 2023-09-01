import React, { useEffect, useState } from 'react';
import MyBreadCrumb from '../../components/MyBreadCrumb';
import { Button, Card } from 'flowbite-react';
import AddMotelForm from '../../components/Form/AddMotelForm';
import StepTwo from '../../components/Form/LandlordForm/StepTwoLandlordForm';
import StepThree from '../../components/Form/LandlordForm/StepThreeLandlordForm';
import "./style.scss";
import AddMotelStepper from '../../components/Stepper/AddMotelStepper';


const AddMotel = () => {
    const [component, setComponent] = useState();
    const [step, setStep] = useState(0);

    const handleNextStep = () => {
        setStep(prev => prev + 1);
    }

    const handlePrevStep = () => {
        if (step !== 0)
            setStep(prev => prev - 1);
    }

    const [motel, setMotel] = useState({
        "name": null,
        "phoneNumber": null,
        "longitude": null,
        "latitude": null,
        "fullLocation": null,
    });

    useEffect(() => {
        const components = [<AddMotelForm />,
        <StepTwo add={true}/>,
        <StepThree />];
        setComponent(components[step])
    }, [step])


    return (<>
        <div className="container">
            <MyBreadCrumb BreadCrumbName="Thêm phòng trọ" />
            <Card className="my-10 items-center my-card">
                <div>
                    <AddMotelStepper step={step} />
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
                                    <p className="font-bold text-base">Hoàn tất</p>
                                </Button> : <Button onClick={handleNextStep} className="bg-blueTemplate w-full">
                                    <p className="font-bold text-base">Tiếp tục</p>
                                </Button>}
                            </div>)
                            :
                            <Button onClick={handleNextStep} className="bg-blueTemplate w-full">
                                <p className="font-bold text-base">Tiếp tục</p>
                            </Button>)}
                    </form>
                </div>
            </Card>
        </div>
    </>);
};

export default AddMotel;