import React from 'react';

const AddMotelForm = () => {

    // const [map, setMap] = useState(null);

    // useEffect(() => {
    //     // console.log("test")
    //     // const key = process.env.REACT_APP_GOONG_MAPS_MAPTILES_KEY;
    //     // goongJs.accessToken = key;
    //     // if (document.querySelector("#map").innerHTML === "") {
    //     //     setMap(new goongJs.Map({
    //     //         container: 'map',
    //     //         style: 'https://tiles.goong.io/assets/goong_map_web.json',
    //     //         center: [105.83991, 21.02800],
    //     //         zoom: 9
    //     //     }));
    //     // }
    // }, []);

    
    return (<>
        <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-bold leading-7 text-blueTemplate">Thông tin nhà trọ</h2>
                <div className="grid grid-cols-3 gap-5 my-5">
                    <div>
                        <label htmlFor="motelName" class="block mb-2 text-gray-900 dark:text-white">Tên phòng trọ</label>
                        <input type="text" id="motelName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blueTemplate dark:focus:border-blueTemplate" />
                    </div>
                    <div>
                        <label htmlFor="motelPhone" class="block mb-2 text-gray-900 dark:text-white">Số điện thoại</label>
                        <input type="tel" id="motelPhone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blueTemplate dark:focus:border-blueTemplate" />
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="location" class="block mb-2 text-gray-900 dark:text-white">Địa chỉ chi tiết</label>
                        <input type="text" id="location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blueTemplate focus:border-blueTemplate block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blueTemplate dark:focus:border-blueTemplate" />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-gray-900 dark:text-white">Địa điểm trên bản đồ</label>
                        <div id="map" style={{ width: "100%", height: "400px" }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default AddMotelForm;