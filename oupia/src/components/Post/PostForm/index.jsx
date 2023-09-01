import React from 'react';
import AreaForm from '../../AreaForm/index';
import DeatailFrom from '../../DetailForm';

const PostForm = ({ currentStep, stepsLength }) => {
    
    switch (currentStep) {
        case 1:
            return (<AreaForm />);
        case 2:
            return (<DeatailFrom/>);
        case 3:
            return (<>
                <AreaForm/>
                <DeatailFrom/>
            </>)
        default:
            return (<><div>Thành công</div></>);
    }
}

export default PostForm;