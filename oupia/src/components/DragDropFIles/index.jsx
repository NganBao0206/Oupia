import React, { useRef, useState } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { FaDeleteLeft } from 'react-icons/fa6';

const DragDropFiles = ({ onFilesChange }) => {
    const [files, setFiles] = useState([]);
    const inputRef = useRef();

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const newFiles = Array.from(event.dataTransfer.files);
        setFiles(files => [...files, ...newFiles]);
        onFilesChange(newFiles);
    }

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles(files => [...files, ...newFiles]);
        onFilesChange(newFiles);
    }

    const handleDelete = (file) => {
        setFiles(files => files.filter(f => f !== file));
        onFilesChange(files.filter(f => f !== file));
    }

    return (
        <>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="flex w-full justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <HiOutlinePhotograph className="mx-auto h-12 w-12 text-blueTemplate" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="images"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-blueTemplate hover:text-indigo-500"
                        >
                            <span>Tải lên file</span>
                            <input
                                id="images"
                                name="images"
                                type="file"
                                multiple
                                className="sr-only"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                                ref={inputRef}
                            />
                        </label>
                        <p className="pl-1">hoặc kéo thả từ thư mục</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">Chỉ nhận ảnh PNG, JPG</p>
                </div>
            </div>
            {files.length !== 0  && ( <div className="grid grid-cols-6 gap-5 mt-10">
                {files.map((file, index) => (
                    <div className="relative">
                        <FaDeleteLeft size="25" className="text-blueTemplate absolute right-2 top-2 cursor-pointer" onClick={() => handleDelete(file)}/>
                        <img key={index} className="rounded-xl h-full w-full" src={URL.createObjectURL(file)} alt={file.name} />
                    </div>
                ))}
            </div>)}
        </>
    );
};

export default DragDropFiles;
