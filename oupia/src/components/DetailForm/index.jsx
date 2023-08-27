import React, {  } from 'react';
import "./style.scss";
import {  FileInput, Label } from 'flowbite-react';

const DeatailFrom = () => {

    return (
        <>
            <div className="max-w-md" id="fileUpload">
                <div className="mb-2 block">
                    <Label
                        htmlFor="file"
                        value="Upload file"
                    />
                </div>
                <FileInput
                    helperText="A profile picture is useful to confirm your are logged into your account"
                    id="file"
                />
            </div>
        </>
    );
};

export default DeatailFrom;