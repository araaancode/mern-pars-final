// src/components/Card.jsx
import React, { useState } from 'react';
import {
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiHeart3Line,
    RiStarFill,
    RiStarHalfLine
} from "@remixicon/react";

import { Link } from "react-router-dom"

const Card = ({ images, house }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <div className="relative">
                <img style={{ height: '300px' }}
                    className="w-full object-cover"
                    src={images[currentIndex]}
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


            <div className='mt-2 flex justify-between items-center'>
                <Link to={'/house/' + house._id}>
                    <h3 className="text-gray-500 font-vazir">{house.name}</h3>
                </Link>

                <div className='flex items-center'>
                    <span className='mt-2 text-gray-500'>
                        ({house.reviews.length} نظر)
                    </span>

                    <RiStarFill className='text-blue-800 w-4 h-4 mr-2' />
                </div>
            </div>

            <div>
                <span style={{ fontSize: '18px' }} className="text-gray-700 block font-semibold">{house.description.slice(0, 35)}...</span>
                <span className="text-gray-500"> قیمت به ازای هر شب</span>
                <span style={{ fontSize: '18px' }} className="font-semibold mt-1 font-vazir"> {house.price}</span>
            </div>


        </div >
    );
};

export default Card;
