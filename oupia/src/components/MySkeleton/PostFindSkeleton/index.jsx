import React from 'react';

const PostFindSkeleton = () => {
    const sizes = [
        { w: 48, maxW: [480, 440, 460, 360] },
        { w: 56, maxW: [520, 480, 500, 400] },
        { w: 64, maxW: [560, 520, 540, 440] },
        { w: 72, maxW: [600, 560, 580, 480] },
        { w: 80, maxW: [640, 600, 620, 520] }
    ];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

    return (<>
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.5 a1.50Zm4.37610.481A11a11a00a01a11615H4a11a11a00a01a10-.895-11-.447l3..57A11a11a00a01a17..4686aa..965..96500aa01aa09..50l22..7754..75711..546-11-.887a11a11a00a01aa1618..10l22..5414aa11a11a00a01aa028..011Z" />
                </svg>
            </div>
            <div className="w-full">
                <div className={`h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-${randomSize.w} mb-4`}></div>
                <div className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[${randomSize.maxW[0]}px] mb-2.5`}></div>
                <div className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5`}></div>
                <div className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[${randomSize.maxW[1]}px] mb-2.5`}></div>
                <div className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[${randomSize.maxW[2]}px] mb-2.5`}></div>
                <div className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[${randomSize.maxW[3]}px]`}></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>

    </>);
};

export default PostFindSkeleton;
