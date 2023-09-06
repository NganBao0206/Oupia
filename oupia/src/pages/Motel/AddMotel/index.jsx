import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button, Card } from 'flowbite-react';
import AddMotelForm from '../../../components/Form/AddMotelForm';
import "./style.scss";
import AddMotelStepper from '../../../components/Stepper/AddMotelStepper';
import StepThreeLandlordForm from '../../../components/Form/LandlordForm/StepThreeLandlordForm';
import StepTwoLandlordForm from '../../../components/Form/LandlordForm/StepTwoLandlordForm';
import MyBreadCrumb from '../../../components/MyBreadCrumb';
import { UserContext } from '../../../App';
import { authApi, endpoints } from '../../../configs/APIs';

export const MotelFormContext = createContext();

const AddMotel = () => {
    const [component, setComponent] = useState();
    const [step, setStep] = useState(0);
    const [currentUser,] = useContext(UserContext);

    const [post, setPost] = useState({
        userId: currentUser,
    });
    const [postRentDetail, setPostRentDetail] = useState({});
    const [postImages, setPostImages] = useState([]);

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
        "locationLongitude": null,
        "locationLatitude": null,
        "fullLocation": null,
    });

    useEffect(() => {
        const components = [<AddMotelForm context={MotelFormContext} />,
        <StepTwoLandlordForm context={MotelFormContext} />,
        <StepThreeLandlordForm add={true} context={MotelFormContext} />];
        setComponent(components[step])
    }, [step])

    const addMotel = async (e) => {
        e.preventDefault();
        if (step < 2) {
            return;
        }
        let form = new FormData();
        form.append('motel', JSON.stringify(motel));
        form.append('post', JSON.stringify(post));
        form.append('postRentDetail', JSON.stringify(postRentDetail));
        postImages.forEach((file) => {
            form.append('files', file);
        });

        // setLoading(true)
        let res = await authApi().post(endpoints['motels'], form, {
            headers: {
                "Custom-Header": "value",
            }
        });
        if (res.status === 201) {
            console.log("success");
        }
    }


    return (<>
        <MotelFormContext.Provider value={{ motel, setMotel, postImages, setPostImages, postRentDetail, setPostRentDetail, post, setPost }}>
            <div className="container">
                <MyBreadCrumb BreadCrumbName="Thêm phòng trọ" />
                <Card className="my-10 items-center my-card">
                    <div>
                        <AddMotelStepper step={step} />
                        <form className="gap-4 mt-2 mx-36 mb-5" onSubmit={e => addMotel(e)}>
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
        </MotelFormContext.Provider>
    </>);
};

export default AddMotel;