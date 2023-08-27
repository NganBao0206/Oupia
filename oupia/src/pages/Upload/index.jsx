import { Card } from 'flowbite-react';
import React, { Fragment, useState } from 'react';
import PostForm from '../../components/PostForm';
import './style.scss'
import StepperButton from '../../components/StepperButton';
import { TiTick } from 'react-icons/ti';
import BreadCrumb from '../../components/BreadCrumb';

const Upload = () => {
    const steps = ["Khu vực", "Thông tin mô tả", "Xác thực", "Hoàn thành"];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);


    return (<Fragment>
        <div className="container">
            <BreadCrumb BreadCrumbName="Đăng tin" />
            <div>
                <div className="flex justify-center">
                    {steps?.map((step, i) => (
                        <div
                            key={i}
                            className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
                                }`}>
                            <div className="step">
                                {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
                            </div>
                            <p className="text-gray-500">{step}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Card className="my-10">    
                <form className="flex flex-col gap-4">

                    <PostForm currentStep={currentStep} stepsLength={steps.length}></PostForm>
                    {!complete && (
                        <StepperButton
                            currentStep={currentStep}
                            stepsLength={steps.length}
                            complete={complete}
                            setComplete={setComplete}
                            setCurrentStep={setCurrentStep}
                        />
                    )}
                </form>
            </Card>
        </div>
    </Fragment>)
};

export default Upload;