import React from 'react';

const RightMessage = (props) => {
    const { content } = props;
    return (
        <div className="w-fit ml-auto">
            <div className="p-2 rounded-xl bg-blueTemplate/25 border border-blueTemplate/25">
                {content}
            </div>
        </div>
    );
};

export default RightMessage;