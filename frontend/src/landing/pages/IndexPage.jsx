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
            <img key={index} src={image} alt={`Slide ${index}`} className="w-1/6 h-1/6 mx-4 rounded-lg" />
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
