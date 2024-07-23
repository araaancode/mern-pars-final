import { useEffect, useState } from "react";
import axios from "axios";
import ArrowLeftIcon from '@iconscout/react-unicons/icons/uil-angle-left.js'
import ArrowRightIcon from '@iconscout/react-unicons/icons/uil-angle-right.js'
import { Link } from "react-router-dom"
import Image from "../components/Image";

import {
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiHeart3Line
} from "@remixicon/react";


const Center = ({ houses }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % houses.images.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? houses.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className='p-8 mt-10'>
            <div className="flex justify-between items-center">
                <div className="text">
                    <h1 className="text-2xl font-bold">اجاره اقامتگاه‌های سنتی در شهرهای مرکزی</h1>
                    <h4 className="mt-1">اقامت خاطره انگیز در خانه‌های سنتی با ما</h4>
                </div>
                <div className="buttons ">
                    <button className="btn mr-2 w-10 h-10 bg-white text-black p-2 border border-gray-300 rounded-xl"><ArrowRightIcon /></button>
                    <button className="btn mr-2 w-10 h-10 bg-white text-black p-2 border border-gray-300 rounded-xl"><ArrowLeftIcon /></button>
                </div>
            </div>
            <div className="mt-8 mb-10 grid gap-x-6 gap-y-8 grid-cols-6 md:grid-cols-4 lg:grid-cols-4 min-w-4xl">
                {houses.length > 0 && houses.slice(20, 26).map(house => (
                    <Link to={'/house/' + house._id} key={house._id}>
                        <div className="bg-gray-500 mb-2 rounded-xl flex">
                            {house.images?.[0] && (
                                // <div className="bg-white rounded-lg overflow-hidden">
                                //     {/* <Image className="rounded-xl object-cover aspect-square" src={house.images?.[0]} alt="" /> */}
                                // <img style={{ height: '300px' }}
                                //     className="w-full object-cover"
                                //     src={house.images?.[0]}
                                // />
                                //     <RiHeart3Line style={{ width: '30px', height: '30px' }} className="absolute top-5 right-0 cursor-pointer transform -translate-y-1/2 bg-opacity-80 hover:bg-opacity-100 mx-2 p-1 rounded-full focus:outline-none" />
                                // </div>
                                <div className="bg-white rounded-lg overflow-hidden">
                                    <div className="relative">
                                        <img style={{ height: '300px' }}
                                            className="w-full object-cover"
                                            src={house.images?.[0]}
                                            alt={`Slide ${currentIndex}`}
                                        />
                                        <RiHeart3Line style={{ width: '40px', height: '40px' }} className="absolute top-4 right-0 cursor-pointer text-white p-1 transform -translate-y-1/2 bg-opacity-20 m-3  focus:outline-none" />

                                        <button
                                            onClick={handlePrevious}
                                            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-100 bg-white mx-2 p-1 rounded-full focus:outline-none"
                                        >
                                            <RiArrowLeftSLine className='font-bold shadow' />
                                        </button>

                                        <button
                                            onClick={handleNext}
                                            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-100 bg-white mx-2 p-1 rounded-full focus:outline-none"
                                        >
                                            <RiArrowRightSLine className='font-bold shadow' />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <h2 className="font-bold">{house.address}</h2>
                        <h3 className="text-sm text-gray-500">{house.name}</h3>
                        <div className="mt-1">
                            قیمت به ازای هر شب
                            <span className="font-bold"> {house.price}</span>
                            <small className="text-gray-500 block">{house.description}</small>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default Center