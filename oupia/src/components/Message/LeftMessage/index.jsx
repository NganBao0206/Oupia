import React from 'react';

const LeftMessage = (props) => {
    const { content, avatar } = props;
    return (<>
        <div className="w-fit flex gap-3 items-center">
            <div className="z-999 w-12 h-12 rounded-full">
                <img
                    src={avatar}
                    alt="Avatar"
                    className="w-full h-full rounded-full"
                />
            </div>
            <div className="p-2 rounded-xl border border-gray-300">
                {content}
            </div>
        </div>
    </>);
};

export default LeftMessage;