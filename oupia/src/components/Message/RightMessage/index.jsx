import React from 'react';

const RightMessage = (props) => {
    const { content } = props;
    return (
        <div className="w-fit ml-auto">
            <div className="p-2 rounded-xl border border-gray-300">
                {content}
            </div>
        </div>
    );
};

export default RightMessage;