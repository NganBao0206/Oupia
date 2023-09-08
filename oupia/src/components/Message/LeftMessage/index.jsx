import React from 'react';
import MessageContent from '../MessageContent';

const LeftMessage = () => {
    return (<>
        <div className="flex flex-col gap-1 w-fit">
            <MessageContent/>
            <MessageContent/>
            <MessageContent/>

        </div>
    </>);
};

export default LeftMessage;