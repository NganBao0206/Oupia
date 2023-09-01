import React from 'react';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { LuSettings } from 'react-icons/lu';
import { PiClipboardTextBold } from 'react-icons/pi';

const AddMotelStepper = (props) => {
    return (<>
        <ol class="flex items-center w-full">
            {props.step > 0 ?
                <li class="flex w-full items-center text-blueTemplate dark:text-blueTemplate after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                    <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                        <svg class="w-3.5 h-3.5 text-blueTemplate lg:w-4 lg:h-4 dark:text-blue-300" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </div>
                    <span className="px-3 whitespace-nowrap">Thông tin nhà trọ</span>
                </li> : <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                    <div class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        <HiOutlineHomeModern class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" />
                    </div>
                    <span className="px-3 whitespace-nowrap">Thông tin nhà trọ</span>
                </li>}

            {props.step > 1 ?
                <li class="flex w-full items-center text-blueTemplate dark:text-blueTemplate after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                    <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                        <svg class="w-3.5 h-3.5 text-blueTemplate lg:w-4 lg:h-4 dark:text-blue-300" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </div>
                    <span className="px-3 whitespace-nowrap">Chi tiết nhà trọ</span>
                </li> : <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                    <div class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        <LuSettings class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" />
                    </div>
                    <span className="px-3 whitespace-nowrap">Chi tiết nhà trọ</span>
                </li>}

            {props.step > 2 ?
                <li class="flex  items-center text-blueTemplate dark:text-blueTemplate">
                    <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                        <svg class="w-3.5 h-3.5 text-blueTemplate lg:w-4 lg:h-4 dark:text-blue-300" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </div>
                    <span className="px-3 whitespace-nowrap">Bài viết</span>
                </li> : <li class="flex items-center ">
                    <div class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        <PiClipboardTextBold class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" />
                    </div>
                    <span className="px-3 whitespace-nowrap">Bài viết</span>
                </li>}
        </ol>
    </>);
};

export default AddMotelStepper;