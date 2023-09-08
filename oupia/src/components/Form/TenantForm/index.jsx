import { Button } from 'flowbite-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DragDropFiles from '../../DragDropFIles';
import { UserContext } from '../../../App';
import APIs, { authApi, endpoints } from '../../../configs/APIs';

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

    const [currentUser,] = useContext(UserContext);
    const [post, setPost] = useState({
        userId: currentUser,
    });
    const [postFindDetail, setPostFindDetail] = useState({});
    const [postImages, setPostImages] = useState([]);

    const changePost = (value, field) => {
        setPost(current => {
            return {...current, [field]: value }
        });
    }

    const changePostDetail = (value, field) => {
        setPostFindDetail(current => {
            return {...current, [field]: value }
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
        setProvince(provVal);

        const distInput = document.querySelector("#district");
        const distVal = getValue(distInput);
        setDistrict(distVal);

        const wardInput = document.querySelector("#ward");
        const wardVal = getValue(wardInput);
        setWard(wardVal);
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
                distInput.value = "";
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

    const handleWard = ({target}) => {
        refreshLocation();
    }

    useEffect(() => {
        let queryTemp;
        if (province) queryTemp = province;
        if (district) queryTemp = district + ", " + province;
        if (ward) queryTemp = ward + ", " + district + ", " + province;
        setQuery(queryTemp);
    }, [province, district, ward])

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
            console.log("success");
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
                                            <input value={postFindDetail.minPrice} onChange={e => changePostDetail(e.target.value, "minPrice")} type="text" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vd: 3000000..." required />
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
                                            <input type="text" value={postFindDetail.maxPrice} onChange={e => changePostDetail(e.target.value, "maxPrice")} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vd: 6000000..." required />
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
                                <h5 id="locationResult" class="text-sm text-gray-700 mt-3">{locationResult ? locationResult : "Địa điểm..."}</h5>
                                <h2 className="text-2xl font-bold leading-7 text-blueTemplate mt-10">Nội dung bài viết</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề </label>
                                        <input onChange={e => changePost(e.target.value, "title")} type="text" id="title" className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nội dung
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={''}
                                                onChange={e => changePost(e.target.value, "description")}
                                                required
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Viết một vài yêu cầu như tiện ích phòng trọ, ...</p>
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
                    <Button type="submit" className="bg-blueTemplate w-1/2 mx-auto whitespace-nowrap">
                        <p className="font-bold text-base">Đăng bài viết</p>
                    </Button>
                </form>
            </div>
        </TenantFormContext.Provider>
    </>);
};

export default TenantForm;