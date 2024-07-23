import { useEffect, useState } from "react";
import axios from "axios";
import ArrowLeftIcon from '@iconscout/react-unicons/icons/uil-angle-left.js'
import ArrowRightIcon from '@iconscout/react-unicons/icons/uil-angle-right.js'
import { Link } from "react-router-dom"
import PhotoCard from "./PhotoCard"

const photoUrls = [
    'https://a0.muscache.com/im/pictures/119cc032-6da5-4868-bed1-8a2222a54a94.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/a04d9dad-9704-49e4-8829-71293299f7fb.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/8421eb85-a3db-4fdf-8aa1-a2e71221b666.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-754078284353522259/original/011e82d7-0a74-4522-8d95-3ba518f67fa1.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/b1c7be21-6d85-4701-9e57-fc903f2ffa99.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/b1c7be21-6d85-4701-9e57-fc903f2ffa99.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1050606510236780815/original/5f1844a7-9377-4351-a870-022774f3e405.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47460174/original/abff9a0b-48db-4f99-93a8-14efcafbf4d2.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-585348692816295810/original/0fea5832-b573-4f15-8cd3-04b5afcd08e7.jpeg?im_w=720',
];

const North = ({ houses }) => {
    console.log(houses);
    return (
        <div className='p-8 mt-10'>
            <div className="flex justify-between items-center">
                <div className="text">
                    <h1 className="text-2xl font-bold">جدیدترین بومگردی‌ها و اقامتگاه‌ها</h1>
                    <h4 className="mt-1">بومگردی‌ و اقامتگاه، اختصاصی با ما</h4>
                </div>
                <div className="buttons ">
                    <button className="btn mr-2 w-10 h-10 bg-white text-black p-2 border border-gray-300 rounded-xl"><ArrowRightIcon /></button>
                    <button className="btn mr-2 w-10 h-10 bg-white text-black p-2 border border-gray-300 rounded-xl"><ArrowLeftIcon /></button>
                </div>
            </div>
            <div className="mt-8 mb-10 grid gap-x-6 gap-y-8 grid-cols-6 md:grid-cols-4 lg:grid-cols-4 min-w-4xl">
                {/* {houses.length > 0 && houses.slice(13, 19).map(house => (

                    // <Link to={'/house/' + house._id} key={house._id}>
                    //     <div className="bg-gray-500 mb-2 rounded-xl flex">
                    //         {house.images?.[0] && (
                    //             <Image className="rounded-xl object-cover aspect-square" src={house.images?.[0]} alt="" />
                    //         )}
                    //     </div>
                    //     <h2 className="font-bold">{house.address}</h2>
                    //     <h3 className="text-gray-500">{house.name}</h3>
                    //     <div className="mt-1 text-sm">
                    //         قیمت به ازای هر شب
                    //         <span className="font-bold"> {house.price}</span>
                    //         <small className="text-gray-500 block">{house.description}</small>
                    //     </div>
                    // </Link>

                    <h1>Hello</h1>

                ))} */}
                    {houses.slice(13, 19).map((_, index) => (
                        <PhotoCard key={index} photos={houses[index].images} />
                    ))}

            </div>
        </div>
    )
}

export default North