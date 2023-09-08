import React from 'react';
import MessageContent from '../MessageContent';

const RightMessage = () => {
    return (
        <div className="w-fit flex flex-col gap-1 ml-auto">
            <MessageContent/>
            <MessageContent/>

        </div>
    );
};

export default RightMessage;