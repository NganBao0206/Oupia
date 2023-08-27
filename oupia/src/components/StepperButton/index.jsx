import { Button } from "flowbite-react";
import React, { Fragment } from "react";

const StepperButton = ({ currentStep, stepsLength, complete, setComplete, setCurrentStep }) => {
    const handleClick = () => {
        if (currentStep === stepsLength) {
            setComplete(true);
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentStep === stepsLength) {
            setComplete(false);
            setCurrentStep((prev) => prev - 1);
        } else {
            setCurrentStep((prev) => prev - 1);
        }
    }

    if (currentStep > 1) {
        return (
            <Fragment>
                <div className="grid grid-cols-3 gap-5 w-100">
                    <Button color="gray" onClick={handlePrevClick} >
                        Trờ lại
                    </Button>
                    <Button color="dark" onClick={handleClick} >
                        Tiếp tục
                    </Button>
                </div>
            </Fragment>
        );
    }

    if (complete) {
        return (
            <Fragment>
                <div color="dark" className="grid grid-cols-3 gap-5">
                    <Button onClick={handleClick} type="submit" >
                        Hoàn thành
                    </Button>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Button color="dark" onClick={handleClick} >
                Tiếp tục
            </Button>
        </Fragment>
    );
};

export default StepperButton;
