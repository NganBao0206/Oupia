import { Card, Carousel } from 'flowbite-react';
import React from 'react';
import { LuBedSingle, LuHeart } from "react-icons/lu";
import { BiArea, BiBath } from 'react-icons/bi';
import { PiShareFat, PiUsersThree } from 'react-icons/pi';
import { IoLocationOutline } from 'react-icons/io5';
import { HiOutlinePhone } from 'react-icons/hi';
import { HiOutlineHomeModern } from 'react-icons/hi2';


const PostDetail = () => {
    return (
        <Card className="h-full">
            <Carousel slideInterval={5000} className="my-5" style={{ height: "600px" }}>
                <div className='w-full h-full'>
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="img"
                        src="https://cdn.chotot.com/HWi9ov9nbW4rdkIJWEcNk4f0nodEgzZGZ7XlHUixTVE/preset:view/plain/727692ecc8b59ba2570c42e3a68dae80-2788900471891162108.jpg"
                    />
                </div>

                <div className='w-full h-full'>
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="img"
                        src="https://cdn.chotot.com/wSk6w00jf10_hoH_T8maMDvMqhOQxjGfUznbR_dskFs/preset:view/plain/b95f8c856d76cd2e90166678bc550e1b-2788900479743030268.jpg"
                    />
                </div>

                <div className='w-full h-full'>
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="img"
                        src="https://cdn.chotot.com/JqMdPRuWwWA67bexirv-VVXbIjy7sVUjOTgvY1OidQg/preset:view/plain/6eaadd8daf3671a5ecd5eea0663e060c-2788900499708048380.jpg"
                    />
                </div>

                <div className='w-full h-full'>
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="img"
                        src="https://cdn.chotot.com/z_88S9ruVP5m9fPvDLctOfE6n2ZNhbHBlmH8VbreYJc/preset:view/plain/7712be4f09a564a80d1a36a97d2841b7-2788900536261050256.jpg"
                    />
                </div>

                <div className='w-full h-full'>
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="img"
                        src="https://cdn.chotot.com/O_iYxsabvsEbg8GTatALrCtak_5eslstmDHNPD7uyDE/preset:view/plain/7b6a700c3ab778f1a4ebb25a13e665da-2788900535930254332.jpg"
                    />
                </div>
            </Carousel>
            <h1 className="text-2xl font-bold">SLEEPBOX MỚI TINH TRUNG TÂM QUẬN 10 CÓ THANG MÁY</h1>
            <div className="flex">
                <h3 className="font-bold text-blueTemplate text-lg">2.000.000đ / tháng</h3>
                <div className="ml-auto flex gap-3 mr-3">
                    <LuHeart size="25" className="text-heartColor" />
                    <PiShareFat size="25" className="text-Dark" />
                </div>
            </div>
            <hr />
            <h2 className="font-extrabold text-xl" >Thông tin phòng trọ</h2>
            <div className=" mb-2 flex flex-col gap-2">
                <div className="flex text-gray-700 items-center gap-1">
                    <HiOutlineHomeModern size="25" />
                    <h3>Tên nhà trọ:</h3>
                </div>
                <div className="flex text-gray-700 items-center gap-1">
                    <HiOutlinePhone size="25" />
                    <h3>Số diện thoại:</h3>
                </div>
                <div className="flex text-gray-700 items-center gap-1">
                    <IoLocationOutline size="25" />
                    <h3>Địa chỉ:</h3>
                </div>
            </div>
            <hr />
            <h2 className="font-extrabold text-xl" >Đặc điểm phòng trọ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 container gap-5 mb-2">
                <div className="max-w-sm p-5 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center">
                    <BiArea className="mr-3 text-blueTemplate" size="25"></BiArea>
                    <h3>25m²</h3>
                </div>
                <div className="max-w-sm p-5 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center">
                    <LuBedSingle className="mr-3 text-blueTemplate" size="25"></LuBedSingle>
                    <h3>2 Phòng ngủ</h3>
                </div>
                <div className="max-w-sm p-5 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center">
                    <BiBath className="mr-3 text-blueTemplate" size="25"></BiBath>
                    <h3>1 Phòng ngủ</h3>
                </div>
                <div className="max-w-sm p-5 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center">
                    <PiUsersThree className="mr-3 text-blueTemplate" size="25"></PiUsersThree>
                    <h3>3 - 4 người</h3>
                </div>
            </div>
            <hr />
            <h2 className="font-extrabold text-xl" >Mô tả chi tiết</h2>
            <div className="whitespace-break-spaces">
                KHÔNG THÍCH Ở Ký túc xá mà tận 100ng, thì mời bạn vô đây, ở càng ít người càng tốt, chất lượng càng cao, bếp có chỗ nấu, mà hông phức tạp quá nè :)

                CN1: Homestay Đường 275 (***Thực tế đăng ảnh)
                *Tiện Ích: Trung tâm quận 9/ Thủ Đức gì cũng có

                * Thuận tiện di chuyển:
                - 5 phút đến ĐH FPT, TC Marketing, SPKT
                - 8 phút đến ĐH Hutech
                - 15 Phút đến Làng ĐH Quốc Gia- ĐH Quốc Tế

                *Phòng ở tiện nghi:
                - Có phòng ngủ, phòng khách và khu bếp riêng biệt.
                - Máy Lạnh, Tủ Lạnh.
                - Phòng mới xây có nhà vệ sinh riêng có máy nước nóng cho từng phòng.
                - Hệ thống khóa vân tay cho cửa chính và cửa phòng, Camera 24/7.
                - Giường có rèm riêng.
                - Chăn ga (vải 100% cotton an toàn cho người sử dụng), rèm và tủ riêng cho mỗi người.
                - Khu vực nấu ăn và phòng khách rộng rãi

                * Dịch vụ trọn gói:
                - Nội thất đầy đủ cho người dùng.
                - Bao gồm điện nước.
                - Wifi miễn phí tốc độ cao.

                * Giá trị gia tăng:
                - Máy giặt, máy sấy nhanh chóng hơn giặt phơi.
                - Máy lọc nước Unilever Pureit Ultima đảm bảo cho sức khỏe người dùng.
                - Dọn dẹp vệ sinh định kỳ

                * GIÁ PHÒNG:
                Ưu đãi đặt cọc sớm chỉ từ 1.650.000 VND

                CN2: Căn Hộ Vinhomes Q9
                * Tiện ích: Hồ bơi phong cách resort, công viên - biển hồ nhân tạo, sân tập thể dục, tiện ích Bách Hóa Xanh, chợ lân cận.
                * CÁC LOẠI GIƯỜNG/ PHÒNG:
                - Phòng ngủ hai giường đơn hoặc giường tầng, full nội thất cho 2 người ở
                * Tiện nghi full nội thất cao cấp
                * Giá phòng:
                - Phòng full nội thất giá từ 1.800.000 vnd/ người.
                - Nguyên Phòng riêng từ 2.500.000 VND- 3.500.000 (Tùy căn, tùy View và nội thất)</div>
        </Card>
    );
};

export default PostDetail;