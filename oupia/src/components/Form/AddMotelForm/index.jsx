import React, { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import APIs, { endpoints } from '../../../configs/APIs';
import goongJs from '@goongmaps/goong-js';

const AddMotelForm = ({context}) => {
    const { motel, setMotel, errors } = useContext(context);
    const [isSelect, setIsSelect] = useState(false);
    const query = useDebounce(motel.fullLocation, 300);
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState([]);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    const key = process.env.REACT_APP_GOONG_MAPS_MAPTILES_KEY;
    goongJs.accessToken = key;

    const getDatas = async (queryInput) => {
        const res = await APIs.get(endpoints["mapAutocomplate"], {
            params: {
                input: queryInput,
                sessionToken: localStorage.getItem("sessionToken")
            }
        })
        const data = await res.data;
        if (data.predictions) {
            setResults(data.predictions);
        }
    }

    const geteocode = async (placeId) => {
        const res = await APIs.get(endpoints["mapDetail"], {
            params: {
                placeId: placeId,
            }
        })
        const data = await res.data;
        changeMotel(data.result.geometry.location.lat, "locationLatitude");
        changeMotel(data.result.geometry.location.lng, "locationLongitude");
        map.flyTo({ center: [data.result.geometry.location.lng, data.result.geometry.location.lat] })
        if (marker === null)
            initMarker(data.result.geometry.location.lng, data.result.geometry.location.lat)
        else {
            marker.setLngLat([data.result.geometry.location.lng, data.result.geometry.location.lat])
        }
    }

    const handleSelectPlace = (e) => {
        setIsSelect(true);
        changeMotel(e.target.innerHTML, "fullLocation");
        setTimeout(() => {
            setIsSelect(false);
            geteocode(e.target.dataset.placeId);
            setIsFocused(false);
        }, 305);

    };

    useEffect(() => {
        if (!query[0]) {
            setResults([]);
            changeMotel("", "locationLatitude");
            changeMotel("", "locationLongitude");
        }
        else if (query[0] && isSelect === false) {
            getDatas(query[0]);
        }
    }, [query[0]])


    const changeMotel = (value, field) => {
        setMotel(current => {
            return { ...current, [field]: value }
        })
    }

    const initMarker = (x, y) => {
        if (map)
            setMarker(
                new goongJs.Marker()
                    .setLngLat([x, y])
                    .addTo(map)
            );
    }

    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        console.log("test")
        if (document.querySelector("#map").innerHTML === "") {
            if (motel.locationLongitude && motel.locationLatitude) {
                setMap(new goongJs.Map({
                    container: 'map',
                    style: 'https://tiles.goong.io/assets/goong_map_web.json',
                    center: [motel.locationLongitude, motel.locationLatitude],
                    zoom: 20
                }));
                setMapReady(true);
            }
                
            else {
                setMap(new goongJs.Map({
                    container: 'map',
                    style: 'https://tiles.goong.io/assets/goong_map_web.json',
                    center: [105.83991, 21.02800],
                    zoom: 20
                }));
            }
        }
    }, []);

    useEffect(() => {
        if (mapReady) {
            initMarker(motel.locationLongitude, motel.locationLatitude);
        }
    }, [mapReady]);


    return (<>
        <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-bold leading-7 text-blueTemplate">Thông tin nhà trọ</h2>
                <div className="grid grid-cols-3 gap-5 my-5">
                    <div className="col-span-3">
                        <label htmlFor="motelName" className="block mb-2 text-gray-900 dark:text-white">Tên phòng trọ</label>
                        <input value={motel.name} onChange={e => changeMotel(e.target.value, "name")} type="text" id="motelName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5" />
                        <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.motel && errors.motel.name}</p>

                    </div>
                    <div className="col-span-3">
                        <label htmlFor="motelPhone" className="block mb-2 text-gray-900 dark:text-white">Số điện thoại</label>
                        <input value={motel.phoneNumber} onChange={e => changeMotel(e.target.value, "phoneNumber")} type="tel" id="motelPhone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5" />
                        <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.motel  && errors.motel.phoneNumber}</p>

                    </div>
                    <div className="col-span-3 relative">
                        <label htmlFor="location" className="block mb-2 text-gray-900 dark:text-white">Địa chỉ chi tiết</label>
                        <input value={motel.fullLocation}
                            onChange={e => changeMotel(e.target.value, "fullLocation")}
                            onFocus={() => setIsFocused(true)}
                            type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5" />
                        <ul className={isFocused ? "absolute bg-Darker z-50 shadow mt-1 rounded-lg w-full py-2 text-sm text-white dark:text-gray-200" : "hidden"}>
                            {results.map((result) => (
                                <li onClick={(e) => handleSelectPlace(e)} className="cursor-pointer px-4 py-2 hover:bg-blueTemplate hover:text-white" data-place-id={result.place_id}>{result.description}</li>
                            ))}
                        </ul>
                        <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.motel && errors.motel.fullLocation}</p>
                    </div>

                    <div className="col-span-3">
                        <label className="block mb-2 text-gray-900 dark:text-white">Địa điểm trên bản đồ</label>
                        <div id="map" style={{ width: "100%", height: "350px" }}>
                        </div>
                        <p id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{errors.motel && errors.motel.locationLongitude}</p>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default AddMotelForm;