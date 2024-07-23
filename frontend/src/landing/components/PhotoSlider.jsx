import { useEffect, useState } from "react";
import axios from "axios";
import ArrowLeftIcon from '@iconscout/react-unicons/icons/uil-angle-left.js'
import ArrowRightIcon from '@iconscout/react-unicons/icons/uil-angle-right.js'
import { Link } from "react-router-dom"
import Image from "../components/Image";


const images = [
    'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1049362398343619920/original/3d8fdec5-2501-4b45-8cd5-6f10ea1dfdb0.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/21b39a28-901d-40cb-8652-f59b6db4219b.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/a4412ff4-22fb-401b-99b4-45fbb2e62d19.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/d40fee07-6462-4f6b-95ec-fc7ef759b623.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-865707200364012433/original/d3680419-95c6-471e-baf7-717c401c314f.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzcwMDgwOTUxNzU3Mzc4MTUw/original/c7aeed4c-a11d-4447-96ca-e78c886d5a69.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/74634b50-1119-43e8-be2d-a467ae2ba342.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1129772018868233070/original/1266517c-44d1-4979-be14-585edf3616ec.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/6f61efe3-23b7-4115-9d0e-db9901d78f68.jpg?im_w=720',
    'https://www.homsa.net/images/rooms/52449/21524491690111515__330x183.jpg',
    'https://www.homsa.net/images/rooms/31294/10312941692602374__330x183.jpg',
    'https://www.homsa.net/images/rooms/87774/40877741714243892__330x183.jpg',
    'https://a0.muscache.com/im/pictures/a04d9dad-9704-49e4-8829-71293299f7fb.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-52467593/original/45f1fc91-dd83-44fe-b23e-8a264d8216bc.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-52747997/original/660e23d0-9eb2-4679-92de-741645837e44.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/84e1ad50-c6d2-4aed-b086-3d682b832f4f.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48112717/original/383dd856-483f-48cb-83ce-076fe676cf19.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/63614626/36779d8e_original.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-1126122443984195882/original/31cc9a17-b777-48f8-a390-52bfcc5cc5c8.jpeg?im_w=720',
  ];
  


const PhotoSlider = ({ houses }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesPerPage = 6;


    const nextSlide = () => {
        if (currentIndex < images.length - imagesPerPage) {
            setCurrentIndex(currentIndex + imagesPerPage);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - imagesPerPage);
        }
    };




    return (
        <div className='bg-black text-white p-8'>
            <div className="flex justify-between items-center">
                <div className="text">
                    <h1 className="text-2xl font-bold">پیشنهاد‌های ویژه تا 40% تخفیف</h1>
                    <h4 className="mt-1">رزرو اقامتگاه‌ با تخفیف‌های هیجان انگیز</h4>
                </div>
                <div className="buttons ">
                    {/* <button className="btn mr-2 w-10 h-10 bg-white p-2 border border-gray-300 rounded-xl"><ArrowRightIcon /></button> */}
                    {/* <button className="btn mr-2 w-10 h-10 bg-white p-2 border border-gray-300 rounded-xl"><ArrowLeftIcon /></button> */}
                    <button
                        onClick={prevSlide}
                        className="btn mr-2 w-10 h-10 bg-white p-2 border border-gray-300 rounded-xl"
                        disabled={currentIndex === 0}
                    >
                        <ArrowRightIcon />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="btn mr-2 w-10 h-10 bg-white p-2 border border-gray-300 rounded-xl"
                        disabled={currentIndex >= images.length - imagesPerPage}
                    >
                        <ArrowLeftIcon />
                    </button>
                </div>
            </div>
            {/* <div className="mt-8 mb-10 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-6 lg:grid-cols-6 min-w-4xl">
                {houses.length > 0 && houses.slice(6, 12).map(house => (
                    <Link to={'/house/' + house._id} key={house._id}>
                        <div className="bg-gray-500 mb-2 rounded-xl flex">
                            {house.images?.[0] && (
                                <img className="rounded-xl w-full object-cover aspect-square" src={house.images?.[0]} alt="" />
                            )}
                        </div>
                        <h2 className="font-bold">{house.address}</h2>
                        <h3 className="text-sm text-gray-500">{house.title}</h3>
                        <div className="mt-1">
                            قیمت به ازای هر شب
                            <span className="font-bold"> {house.price}</span>
                            <small className="text-gray-500 block">{house.description}</small>
                        </div>
                    </Link>
                ))}

            </div> */}

            <div className="relative w-full my-8">
                <div className="flex overflow-hidden">
                    {images.slice(currentIndex, currentIndex + imagesPerPage).map((image, index) => (
                        <img style={{ width: '200px', height: '200px' }} key={index} src={image} alt={`Slide ${index}`} className=" mx-4 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PhotoSlider