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

import places from "../../places.json"

export default function IndexPage() {
  // const [places, setPlaces] = useState([]);
  // useEffect(() => {
  //   axios.get('/api/places').then(response => {
  //     setPlaces(response.data);
  //   });
  // }, []);

  console.log(places);


  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center px-8">
        <div className="text">
          <h1 className="text-gray-900 text-2xl font-bold">اجاره ویلا در مقصدهای محبوب</h1>
          <h4 className="text-gray-900 mt-1">اقامتگاه در شهرهای پرطرفدار با ما</h4>
        </div>
        <div className="buttons ">
          <button className="btn mr-2 w-10 h-10 bg-white p-2 border border-gray-300 rounded-xl"><ArrowRightIcon /></button>
          <button className="btn mr-2 w-10 h-10 bg-white p-2 border border-gray-300 rounded-xl"><ArrowLeftIcon /></button>
        </div>
      </div>

      <div className="mt-8 mb-10 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-6 lg:grid-cols-6 min-w-4xl px-8">
        {places.length > 0 && places.map(place => (
          <Link to={'/place/' + place._id} key={place._id}>
            <div className="bg-gray-500 mb-2 rounded-xl flex">
              {place.photos?.[0] && (
                <Image className="rounded-xl object-cover aspect-square" src={place.photos?.[0]} alt="" />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              قیمت به ازای هر شب
              <span className="font-bold"> {place.price}</span>
              <small className="text-gray-500 block">{place.description}</small>
            </div>
          </Link>
        ))}
      </div>
      <PhotoSlider places={places} />
      <North places={places} />
      <Center places={places} />
    </>

  );
}
