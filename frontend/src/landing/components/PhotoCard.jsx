// src/components/Card.jsx
import React, { useState } from 'react';
import {
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiHeart3Line
} from "@remixicon/react";

const Card = ({ photos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <div className="relative">
                <img style={{ height: '300px' }}
                    className="w-full object-cover"
                    src={photos[currentIndex]}
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
            <h3 className="text-sm text-gray-500 mt-1">name</h3>
            <div className="mt-1">
                قیمت به ازای هر شب
                <span className="font-bold"> 20000</span>
                <small className="text-gray-500 block">description</small>
            </div>
        </div>
    );
};

export default Card;
