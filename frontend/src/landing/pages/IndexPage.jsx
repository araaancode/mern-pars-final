import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../components/Image.jsx";
import Navbar from "../components/Navbar.jsx"
import PhotoSlider from "../components/PhotoSlider.jsx";
import North from "../components/North.jsx"
import Center from "../components/Center.jsx"
import ArrowLeftIcon from '@iconscout/react-unicons/icons/uil-angle-left.js'
import ArrowRightIcon from '@iconscout/react-unicons/icons/uil-angle-right.js'

import Header from "../components/Header";
import Footer from "../components/Footer.jsx";


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
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
];


export default function IndexPage() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    axios.get('/api/users/houses').then(response => {
      setHouses(response.data.houses.slice(0, 24));
    });
  }, []);


  // photo slider 
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
    <>
      <Header />
      <div className="flex justify-between items-center px-8">
        <div className="text">
          <h1 className="text-gray-900 text-2xl font-bold">اجاره ویلا در مقصدهای محبوب</h1>
          <h4 className="text-gray-900 mt-1">اقامتگاه در شهرهای پرطرفدار با ما</h4>
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

      {/* <div className="mt-8 mb-10 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-6 lg:grid-cols-6 min-w-4xl px-8">
        {houses.length > 0 && houses.map(house => (
          <Link to={'/house/' + house._id} key={house._id}>
            <div className="bg-gray-500 mb-2 rounded-xl flex">
              {house.images?.[0] && (
                <Image className="rounded-xl object-cover aspect-square" src={house.images?.[0]} alt="" />
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
      </div>  */}


      <div className="relative w-full my-16">
        <div className="flex overflow-hidden">
          {images.slice(currentIndex, currentIndex + imagesPerPage).map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index}`} className="w-2/6 h-50 mx-4 rounded-lg" />
          ))}
        </div>
        {/* <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2"
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2"
          disabled={currentIndex >= images.length - imagesPerPage}
        >
          Next
        </button> */}
      </div>

      <PhotoSlider houses={houses} />
      <North houses={houses} />
      <Center houses={houses} />
      <Footer />
    </>

  );
}
