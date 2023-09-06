import { Button } from "flowbite-react";
import { HiOutlineLocationMarker, HiOutlineSearch } from "react-icons/hi";

import { LuFilter } from "react-icons/lu"
import { LiaCoinsSolid, LiaBedSolid } from "react-icons/lia"
import { PiUsers, PiUsersThree, PiBathtub } from "react-icons/pi"
import { useContext, useEffect, useState } from "react";
import { ParamsContext } from "../../providers/ParamsProvider";
import { useDebounce } from "use-debounce";
import APIs, { endpoints } from "../../configs/APIs";

const SearchPost = () => {
    const [isExtraFilter, setIsExtraFilter] = useState(false);
    const [results, setResults] = useState([]);
    const { params, setParams } = useContext(ParamsContext);
    const [address, setAddress] = useState(params.location);
    const [isSelect, setIsSelect] = useState(false);
    const myQuery = useDebounce(address, 300);
    const [isFocused, setIsFocused] = useState(false);



    const handleResult = (e) => {
        setAddress(e.target.value);
    };

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
        changeParams(data.result.formatted_address, "location");
        changeParams(data.result.geometry.location.lat, "latitude");
        changeParams(data.result.geometry.location.lng, "longitude");
    }

    const handleSelectPlace = (e) => {
        setIsSelect(true);
        setAddress(e.target.innerHTML);
        setTimeout(() => {
            setIsSelect(false);
            geteocode(e.target.dataset.placeId);
            setIsFocused(false);
        }, 305);

    };

    useEffect(() => {
        if (!myQuery[0]) {
            setResults([]);
            if (params.location) {
                changeParams("", "location");
                changeParams("", "latitude");
                changeParams("", "longitude");
            }
        }
        else if (myQuery[0] && isSelect === false) {
            getDatas(myQuery[0]);
        }
    }, [myQuery[0]])

    const handleFilterClick = () => {
        setIsExtraFilter(!isExtraFilter);
    };


    const changeParams = (value, field) => {
        setParams(current => {
            return { ...current, [field]: value, page: 1 };
        });
    }

    return (<>
        <div className="grid grid-cols-12 gap-5 items-stretch">
            <div className="col-span-5 relative">
                <label htmlFor="location-search" className="mb-2 text-sm font-medium sr-only text-gray-900">Search location</label>
                <div className="relative h-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <HiOutlineLocationMarker className="text-gray-900" size={20} />
                    </div>
                    <input value={address} type="search" id="location-search"
                        onChange={e => handleResult(e)}
                        onFocus={() => setIsFocused(true)}
                        className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Nhập khu vực..." />
                </div>
                <ul className={isFocused ? "absolute bg-Darker z-50 shadow mt-1 rounded-lg w-full py-2 text-sm text-white dark:text-gray-200" : "hidden"}>
                    {results.map((result) => (
                        <li onClick={(e) => handleSelectPlace(e)} className="cursor-pointer px-4 py-2 hover:bg-blueTemplate hover:text-white" data-place-id={result.place_id}>{result.description}</li>
                    ))}
                </ul>
            </div>
            <div className="col-span-5">
                <label htmlFor="keyword-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search keyword</label>
                <div className="relative h-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <HiOutlineSearch className="text-gray-900" size={20} />
                    </div>
                    <input value={params.kw} type="search" id="keyword-search"
                        onChange={e => changeParams(e.target.value, "kw")}
                        className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Nhập từ khóa..." />
                </div>
            </div>
            <div className="col-span-2">
                <Button className="bg-blueTemplate h-full w-full" onClick={() => handleFilterClick()}>
                    <LuFilter size={20} /> <p className="text-base ms-2 font-bold">Lọc</p>
                </Button>
            </div>

            <div id="extra-filter" className={isExtraFilter ? "col-span-12 grid grid-cols-12 gap-5" : "hidden"}>
                <div className="col-span-2">
                    <label htmlFor="min-price-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search min price</label>
                    <div className="relative  h-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <LiaCoinsSolid className="text-gray-900" size={20} />
                        </div>
                        <input value={params.minPrice} type="search" id="min-price-search"
                            onChange={e => changeParams(e.target.value, "minPrice")}
                            className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Giá tối thiểu..." />
                    </div>
                </div>
                <div className="col-span-2">
                    <label htmlFor="max-price-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search max price</label>
                    <div className="relative  h-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <LiaCoinsSolid className="text-gray-900" size={20} />
                        </div>
                        <input value={params.maxPrice} type="search" id="max-price-search"
                            onChange={e => changeParams(e.target.value, "maxPrice")}
                            className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Giá tối đa..." />
                    </div>
                </div>
                <div className="col-span-2">
                    <label htmlFor="min-people-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search min people</label>
                    <div className="relative  h-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <PiUsers className="text-gray-900" size={20} />
                        </div>
                        <input value={params.minPeople} type="search" id="min-people-search"
                            onChange={e => changeParams(e.target.value, "minPeople")}
                            className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Số người tối thiểu..." />
                    </div>
                </div>
                <div className="col-span-2">
                    <label htmlFor="max-people-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search max people</label>
                    <div className="relative  h-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <PiUsersThree className="text-gray-900" size={20} />
                        </div>
                        <input value={params.maxPeople} type="search" id="max-people-search"
                            onChange={e => changeParams(e.target.value, "maxPeople")}
                            className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Số người tối đa..." />
                    </div>
                </div>
                <div className="col-span-2">
                    <label htmlFor="num-beds-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search num beds</label>
                    <div className="relative  h-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <LiaBedSolid className="text-gray-900" size={20} />
                        </div>
                        <input value={params.numOfBedrooms} type="search" id="num-beds-search"
                            onChange={e => changeParams(e.target.value, "numOfBedrooms")}
                            className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Số phòng ngủ..." />
                    </div>
                </div>
                <div className="col-span-2">
                    <label htmlFor="num-baths-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search num baths</label>
                    <div className="relative  h-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <PiBathtub className="text-gray-900" size={20} />
                        </div>
                        <input value={params.numOfBathrooms} type="search" id="num-baths-search"
                            onChange={e => changeParams(e.target.value, "numOfBathrooms")}
                            className="h-full block w-full p-4 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blueTemplate focus:border-blueTemplate" placeholder="Số phòng tắm..." />
                    </div>
                </div>

            </div>

        </div>
    </>)
}

export default SearchPost;