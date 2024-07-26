// src/FavoritesPage.js
import React, { useState, useEffect } from 'react';
import { RiTentLine, RiUser3Fill, RiSearchLine, RiCalendar2Line, RiLogoutBoxRLine, RiHeart2Line, RiBankCard2Line, RiNotificationLine, RiCustomerService2Line, RiCameraFill } from "@remixicon/react";
import { FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import HeaderLog from '../components/HeaderLog';
import Footer from "../components/Footer"

import { IoIosCamera } from "react-icons/io";
import { FaTrash } from 'react-icons/fa';
import { BsTrash } from "react-icons/bs";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const cardData = [
  {
    title: 'Card 1',
    description: 'This is the description for card 1.',
    imageUrl: 'https://a0.muscache.com/im/pictures/0130ccbf-d3ec-407e-bb02-0e35754ced61.jpg?im_w=720',
  },
  {
    title: 'Card 2',
    description: 'This is the description for card 2.',
    imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-1049362398343619920/original/3d8fdec5-2501-4b45-8cd5-6f10ea1dfdb0.jpeg?im_w=720',
  },
  {
    title: 'Card 3',
    description: 'This is the description for card 3.',
    imageUrl: 'https://a0.muscache.com/im/pictures/21b39a28-901d-40cb-8652-f59b6db4219b.jpg?im_w=720',
  },
  {
    title: 'Card 4',
    description: 'This is the description for card 4.',
    imageUrl: 'https://a0.muscache.com/im/pictures/a4412ff4-22fb-401b-99b4-45fbb2e62d19.jpg?im_w=720',
  },
  {
    title: 'Card 5',
    description: 'This is the description for card 5.',
    imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-865707200364012433/original/d3680419-95c6-471e-baf7-717c401c314f.jpeg?im_w=720',
  },
  {
    title: 'Card 6',
    description: 'This is the description for card 6.',
    imageUrl: 'https://www.homsa.net/images/rooms/31294/10312941692602374__330x183.jpg',
  }
];


const FavoritesPage = () => {

  const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null

  const [name, setName] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    axios.get('/api/users/me', {
      headers: {
        'authorization': 'Bearer ' + userToken
      }
    })
      .then((res) => {
        setUser(res.data.user)
      })
      .catch((err) => console.error(err));
  }, [])

  return (
    <>
      <HeaderLog />
      <div className="flex flex-col md:flex-row p-4 rtl mt-4">

        {/* User Basic Information Column 1 */}
        <div className="w-full md:w-1/4 py-6 bg-white border border-gray-200 rounded-lg shadow mb-4 md:mb-0">
          <div className="mb-4 px-8 text-center mx-auto flex justify-center">
            <div className="relative" style={{ width: '160px', height: '160px' }}>
              <img
                src="https://www.homsa.net/images/user_pic-225x225.png"
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-3 left-0 p-2 bg-white cursor-pointer shadow shadow-full rounded-full">
                <IoIosCamera className='text-pink-600 h-8 w-8' />
              </div>
            </div>
          </div>
          <div className="mb-4 px-8">
            <p className="text-gray-900 text-center">{name ? user.name : user.phone}</p>
          </div>
          <div className='border'></div>
          <div className='my-6 px-8'>
            <Link to="/profile">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiUser3Fill /></span>
                <span style={{ fontSize: '18px' }} className="mr-4">حساب کاربری</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/bookings">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiCalendar2Line /></span>
                <span style={{ fontSize: '18px' }} className="mr-4">رزروهای من</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/favorites">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiHeart2Line className='text-pink-600' /></span>
                <span style={{ fontSize: '18px' }} className="mr-4 text-pink-600"> لیست علاقه مندی ها</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/bank">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiBankCard2Line /></span>
                <span style={{ fontSize: '18px' }} className="mr-4">اطلاعات حساب بانکی</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/notifications">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiNotificationLine /></span>
                <span style={{ fontSize: '18px' }} className="mr-4">لیست اعلان ها</span>
              </li>
            </Link>
          </div>

          <div className='my-6 px-8'>
            <Link to="/support">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiCustomerService2Line /></span>
                <span style={{ fontSize: '18px' }} className="mr-4">پشتیبانی</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/logout">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiLogoutBoxRLine /></span>
                <span style={{ fontSize: '18px' }} className="mr-4">خروج</span>
              </li>
            </Link>
          </div>
        </div>

        {/* Update User Information Column 2 */}
        <div className="w-full md:w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow mx-6">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cardData.map((card, index) => (
                <div className="rounded-lg overflow-hidden transition-shadow duration-300">
                  <div className="relative group">
                    <img style={{ borderRadius: '8px' }} src={card.imageUrl} alt={card.title} className="w-full h-48 object-cover" />
                    {/* Trash icon on hover */}
                    <div className="absolute top-2 left-2 p-1 opacity-0 rounded-full group-hover:opacity-100 bg-white transition-opacity duration-300">
                      <BsTrash className="text-pink-600 w-10 h-10 cursor-pointer bg-white bg-opacity-50 rounded-full p-2" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default FavoritesPage;
