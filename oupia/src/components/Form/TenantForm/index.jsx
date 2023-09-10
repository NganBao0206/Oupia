import { Button, Spinner } from 'flowbite-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DragDropFiles from '../../DragDropFIles';
import { UserContext } from '../../../App';
import APIs, { authApi, endpoints } from '../../../configs/APIs';
import { Link } from 'react-router-dom';
import { schemaPost } from '../../../validators/yupValidators';

export const TenantFormContext = createContext();


const TenantForm = () => {
    const [provs, setProvs] = useState([]);
    const [dists, setDists] = useState([]);
    const [ws, setWs] = useState([]);

    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [locationResult, setLocationResult] = useState(null);
    const [query, setQuery] = useState(null);
    const [errors, setErrors] = useState({});

    const [currentUser,] = useContext(UserContext);
    const [post, setPost] = useState({
        userId: currentUser,
    });
    const [postFindDetail, setPostFindDetail] = useState({});
    const [postImages, setPostImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const changePost = (value, field) => {
        setPost(current => {
            return { ...current, [field]: value }
        });
    }


    useEffect(() => {
        const validateAll = async () => {
            let schemas = [schemaPost];
            let data = [post];
            let dataNames = ['post'];

            setErrors({});

            for (let i = 0; i < schemas.length; i++) {
                try {
                    await schemas[i].validate(data[i], { abortEarly: false });
                } catch (error) {
                    const errorMessages = {};
                    error.inner.forEach(err => {
                        errorMessages[err.path] = err.message;
                    });
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [dataNames[i]]: errorMessages
                    }));
                }
            }
        };

        validateAll();
    }, [post]);


    const changePostDetail = (value, field) => {
        setPostFindDetail(current => {
            return { ...current, [field]: value }
        });
    }

    const getValue = (target) => {
        if (!target.value) return null;
        let result;
        const options = target.childNodes;
        options.forEach(op => {
            if (target.value === op.value)
                result = op.innerHTML;
        })
        return result;
    }

    const refreshLocation = () => {
        const provInput = document.querySelector("#province");
        const provVal = getValue(provInput);

        const distInput = document.querySelector("#district");
        const distVal = getValue(distInput);

        const wardInput = document.querySelector("#ward");
        const wardVal = getValue(wardInput);
        let queryTemp;
        if (provVal) queryTemp = provVal;
        if (distVal) queryTemp = distVal + ", " + provVal;
        if (wardVal) queryTemp = wardVal + ", " + distVal + ", " + provVal;
        setQuery(queryTemp);
    }

    const handleProvince = async ({ target }) => {
        const selectedProvCode = target.value;

        if (selectedProvCode) {
            try {
                const res = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvCode}?depth=2`);
                const resDist = res.data.districts;
                setDists(resDist);

            } catch (ex) {
                console.error('Error fetching provinces: ', ex);
            }
        } else {
            setDists([]);
            setWs([]);
        }
        const distInput = document.querySelector("#district");
        const wardInput = document.querySelector("#ward");

        distInput.value = "";
        wardInput.value = "";
        refreshLocation();
    }


    const handleDistrict = async ({ target }) => {
        const selectedDistCode = target.value;

        if (selectedDistCode) {
            try {
                const res = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistCode}?depth=2`);
                const resWard = res.data.wards;
                setWs(resWard);

            } catch (ex) {
                console.error('Error fetching districts: ', ex);
            }
        } else setWs([]);
        const wardInput = document.querySelector("#ward");
        wardInput.value = "";
        refreshLocation();
    }

    const handleWard = ({ target }) => {
        refreshLocation();
    }



    const getDetail = async (placeId) => {
        const res = await APIs.get(endpoints["mapDetail"], {
            params: {
                placeId: placeId,
            }
        })
        const data = await res.data;
        setLocationResult(data.result.formatted_address);
        changePostDetail(data.result.formatted_address, "location");
        changePostDetail(data.result.geometry.location.lat, "locationLatitude");
        changePostDetail(data.result.geometry.location.lng, "locationLongitude");
    }

    const getDatas = async (queryInput) => {
        const res = await APIs.get(endpoints["mapAutocomplate"], {
            params: {
                input: queryInput,
                sessionToken: localStorage.getItem("sessionToken")
            }
        })
        const data = await res.data;
        if (data.predictions) {
            const rs = data.predictions[0];
            const placeId = rs.place_id;
            getDetail(placeId)
        } else {
            setLocationResult(null);
        }
    }

    useEffect(() => {
        if (query) {
            console.log(query);
            getDatas(query);
        } else {
            setLocationResult(null);
            changePostDetail(null, "location");
            changePostDetail(null, "locationLatitude");
            changePostDetail(null, "locationLongitude");
        }
    }, [query])
    useEffect(() => {
        const getProvince = async () => {
            try {
                const res = await axios.get("https://provinces.open-api.vn/api/?depth=2");
                const resProv = res.data;
                setProvs(await resProv);
            } catch (ex) {
                console.error('Error fetching wards: ', ex);
            }
        }
        getProvince();
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (errors) {
            alert("Thông tin chưa hợp lệ, vui lòng kiểm tra trước khi hoàn tất");
            return;
        }

        if (!postFindDetail.location) {
            alert("Thông tin chưa hợp lệ, vui lòng chọn khu vực");
            return;
        }

        let form = new FormData();
        form.append('post', JSON.stringify(post));
        form.append('postFindDetail', JSON.stringify(postFindDetail));
        postImages.forEach((file) => {
            form.append('files', file);
        });

        // setLoading(true)
        let res = await authApi().post(endpoints['addPostFind'], form, {
            headers: {
                "Custom-Header": "value",
            }
        });
        if (res.status === 201) {
            setLoading(false);
            setIsSuccess(true);
        }
    }

    return (<>
        <TenantFormContext.Provider value={{ postImages, setPostImages }}>
            <div className="w-full">
                <form className="gap-4 mt-2 mx-36" onSubmit={e => submitForm(e)}>
                    <div className="my-10 flex items-center">
                        <div className="w-full">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-2xl font-bold leading-7 text-blueTemplate">Yêu cầu về nhà trọ</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Giá tối thiểu
                                        </label>
                                        <div className="relative w-full mt-2">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            </div>
                                            <input value={postFindDetail.minPrice} onChange={e => changePostDetail(e.target.value, "minPrice")} type="text" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5 pr-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  " placeholder="Vd: 3000000..." required />
                                            <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                                <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                                    VND
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Giá tối đa
                                        </label>
                                        <div className="relative w-full mt-2">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            </div>
                                            <input type="text" value={postFindDetail.maxPrice} onChange={e => changePostDetail(e.target.value, "maxPrice")} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5 pr-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  " placeholder="Vd: 6000000..." required />
                                            <div className="absolute block inset-y-0 right-0 flex items-center px-3">
                                                <span className="border-l-2 pl-3 text-gray-500 dark:text-gray-400">
                                                    VND
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="province" className="block text-sm font-medium leading-6 text-gray-900">
                                            Tỉnh / Thành phố
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="province"
                                                name="province"
                                                className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                onChange={handleProvince} defaultValue="">
                                                <option value="">
                                                    --Chọn tỉnh / thành phố--
                                                </option>
                                                {provs.map((resProv, index) => (
                                                    <option key={index} value={resProv.code}>
                                                        {resProv.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                            Quận / Huyện
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="district"
                                                name="district"
                                                className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                onChange={handleDistrict} defaultValue=""
                                            >
                                                <option value="">
                                                    --Chọn quận / huyện--
                                                </option>
                                                {dists && dists.map((resDist, index) => (
                                                    <option key={index} value={resDist.code}>
                                                        {resDist.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phường / Xã
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="ward"
                                                name="ward"
                                                className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                onChange={handleWard} defaultValue=""
                                            >
                                                <option value="">
                                                    --Chọn phường / xã--
                                                </option>
                                                {ws && ws.map((resWard, index) => (
                                                    <option key={index} value={resWard.code}>
                                                        {resWard.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <h5 id="locationResult" className="text-lg font-bold text-gray-700 mt-5">{locationResult ? (<>Khu vực bạn chọn: <span className="text-blueTemplate">{locationResult}</span></>) : "Địa điểm..."}</h5>
                                <h2 className="text-2xl font-bold leading-7 text-blueTemplate mt-10">Nội dung bài viết</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 "><div className="flex"><h3>Tiêu đề</h3><h3 className={`ml-auto ${(post.title && post.title.length >= 20 && post.title.length <= 100) ? "" : "text-red-700"}`}>Tối thiểu từ 20 đến 100 ký tự</h3></div> </label>
                                        <input onChange={e => changePost(e.target.value, "title")} type="text" id="title" className={`w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5 ${(post.title && post.title.length >= 20 && post.title.length <= 100) ? "" : "border-red-700 focus:ring-red-700 focus:border-red-700"}`} required />
                                        <p class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.post && errors.post.title}</p>

                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            <div className="flex"><h3>Nội dung</h3><h3 className={`ml-auto ${(post.description && post.description.length >= 50) ? "" : "text-red-700"}`}>Tối thiểu 50 ký tự</h3></div></label>
                                        <div className="mt-2">
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blueTemplate sm:text-sm sm:leading-6 ${(post.description && post.description.length >= 50) ? "" : "ring-red-700 focus:ring-red-700 focus:border-red-700"}`}
                                                defaultValue={''}
                                                onChange={e => changePost(e.target.value, "description")}
                                                required
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Viết một vài yêu cầu như tiện ích phòng trọ, ...</p>
                                        <p class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.post && errors.post.description}</p>

                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Hình ảnh
                                        </label>
                                        <DragDropFiles context={TenantFormContext} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {loading !== false ?
                            <Spinner
                                size="lg" className="my-2 fill-blueTemplate" />
                            : <Button type="submit" className="bg-blueTemplate w-1/2 mx-auto whitespace-nowrap">
                                <p className="font-bold text-base">Đăng bài viết</p>
                            </Button>}
                    </div>

                </form>
            </div >
        </TenantFormContext.Provider >
        {isSuccess === false ? <></> : <div className="absolute right-10 bottom-10">
            <div id="toast-success" className="border border-gray-300 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">Bài viết của bạn đã thêm vào diễn đàn. <Link to="/forum" className="text-blueTemplate">Xem ngay</Link></div>
                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>}

    </>);
};

export default TenantForm;