import React from 'react';
import MyBreadCrumb from '../../components/MyBreadCrumb';
import PostFindItem from '../../components/Post/PostFindItem';
import UserStatus from '../../components/User/UserStatus';
import UserItem from '../../components/User/UserItem';

const Forum = () => {

    return (<>
        <div className="container">
            <MyBreadCrumb BreadCrumbName="Diễn đàn" />
            <div className="grid grid-cols-7 my-5 gap-5">
                <div className="col-span-5">
                    <div className=" border border-gray-200 rounded-xl shadow-lg p-5 flex gap-10 items-center">
                        <UserStatus />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="p-10 items-center border border-gray-200 rounded-xl shadow-lg flex flex-col">
                        <h2 className="text-Dark font-bold text-xl w-full text-center">Người bạn theo dõi</h2>
                        <div className="inline-flex items-center justify-center w-full relative">
                            <hr className="w-48 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                            <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                                <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                                </svg>
                            </div>
                        </div>
                        <UserItem />
                    </div>
                </div>
            </div>
            <PostFindItem />
        </div>
    </>);
};

export default Forum;