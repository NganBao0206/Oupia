import React, { useContext } from 'react';
import DragDropFiles from '../../../DragDropFIles';
import { FormContext } from '../../../../pages/Register';

const StepTwoLandlordForm = ({context}) => {
    const { post, setPost, errors, postImages } = useContext(context);
    const changePost = (value, field) => {
        setPost(current => {
            return { ...current, [field]: value }
        })
    }
    return (<>
        <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-bold leading-7 text-blueTemplate">Nội dung bài viết</h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label for="title" className="block mb-2 text-gray-900 dark:text-white">Tiêu đề </label>
                        <input value={post.title} onChange={e => changePost(e.target.value, "title")} type="text" id="title" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5" required />
                        <p  class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.post && errors.post.title}</p>

                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block leading-6 text-gray-900">
                            Nội dung
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="about"
                                name="about"
                                rows={5}
                                value={post.description}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blueTemplate focus:border-blueTemplate sm:text-sm sm:leading-6"
                                defaultValue={''}
                                onChange={e => changePost(e.target.value, "description")}
                                required
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Viết một tiện ích nhà trọ như bãi gửi xe, mô tả , ...</p>
                        <p  class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.post && errors.post.description}</p>

                    </div>

                    <div className="col-span-full">
                        <label htmlFor="photo" className="block leading-6 text-gray-900">
                            Hình ảnh
                        </label>
                        <DragDropFiles context={context} id="photo" />
                        <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{postImages.length < 3 && 'Ít nhất 3 ảnh'}</p>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default StepTwoLandlordForm;