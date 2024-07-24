// src/BankPage.js
import React, { useState, useEffect } from 'react';
import { RiTentLine, RiUser3Fill, RiSearchLine, RiCalendar2Line, RiLogoutBoxRLine, RiHeart2Line, RiBankCard2Line, RiNotificationLine, RiCustomerService2Line, RiCameraFill } from "@remixicon/react";
import { FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import HeaderLog from '../components/HeaderLog';
import Footer from "../components/Footer"

import { IoIosCamera } from "react-icons/io";
import { LiaPlusSolid } from "react-icons/lia";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BankPage = () => {

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
                <span className="mr-2 text-gray-400"><RiHeart2Line /></span>
                <span style={{ fontSize: '18px' }} className="mr-4"> لیست علاقه مندی ها</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/bank">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiBankCard2Line className='text-pink-600' /></span>
                <span style={{ fontSize: '18px' }} className="mr-4 text-pink-600">اطلاعات حساب بانکی</span>
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
        <div className="w-full md:w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow m-auto h-screen mx-6">

          {/* <div className="flex flex-col justify-center m-auto w-full">
            <div className='bg-gray-100 block p-12 rounded-full w-20 h-20'>
              <RiBankCard2Line className='w-10 h-10 text-gray-300' />
            </div>
            <div className="p-4 block">
              <h1 style={{fontSize:'20px'}} className='text-gray-500'>هنوز هیچ حساب بانکی وجود ندارد</h1>
              <h2 className='text-gray-400'>جهت دریافت وجه، اطلاعات حساب خود را اضافه کنید</h2>
            </div>
            <div className="p-4 block">
              <button class="bg-blue-800 hover:bg-blue-900 text-white font-bold p-4 rounded">+ افزودن اطلاعات حساب </button>
            </div>
          </div> */}


          <div className="flex items-center justify-center h-screen">
            <div className="bg-whit p-8 text-center">
              <div style={{ width: '150px', height: '150px',margin:'20px auto' }} className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                <RiBankCard2Line className="text-gray-400 w-12 h-12 " />
              </div>
              <h2 style={{fontSize:'20px'}} className="text-gray-500 mb-2">هنوز هیچ حساب بانکی وجود ندارد</h2>
              <h2 style={{fontSize:'20px'}} className="text-gray-500">جهت دریافت وجه، اطلاعات حساب خود را اضافه کنید</h2>
              <button style={{ borderRadius: "10px",margin:'50px 0' }} className="bg-blue-800 text-white py-4 px-8 hover:bg-blue-900 font-bold transition duration-300">
                + افزودن اطلاعات حساب
              </button>
            </div>
          </div>

        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default BankPage;
