// src/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { RiTentLine, RiUser3Fill, RiSearchLine, RiCalendar2Line, RiLogoutBoxRLine, RiHeart2Line, RiBankCard2Line, RiNotificationLine, RiCustomerService2Line, RiCameraFill } from "@remixicon/react";
import { FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import HeaderLog from '../components/HeaderLog';
import Footer from "../components/Footer"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProfilePage = () => {

  const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null

  const [user, setUser] = useState({})

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [nationalCode, setNationalCode] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')

  useEffect(() => {
    axios.get('/api/users/me', {
      headers: {
        'authorization': 'Bearer ' + userToken
      }
    })
      .then((res) => {
        setUser(res.data.user)

        setName(res.data.user.name)
        setUsername(res.data.user.username)
        setPhone(res.data.user.phone)
        setEmail(res.data.user.email)
        setNationalCode(res.data.user.nationalCode)
        setProvince(res.data.user.province)
        setCity(res.data.user.city)
        setGender(res.data.user.gender)
      })
      .catch((err) => console.error(err));
  }, [])


  const updateUser = (e) => {
    e.preventDefault();

    axios.put('/api/users/update-profile', {
      name,
      username,
      phone,
      email,
      nationalCode,
      gender,
      province,
      city
    }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + userToken
      }
    }).then((res) => {
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    })
      .catch((err) => {
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <>
      <HeaderLog />
      <div className="flex flex-col md:flex-row p-4 rtl mt-4">

        {/* User Basic Information Column 1 */}
        <div className="w-full md:w-1/4 py-6 bg-white border border-gray-200 rounded-lg shadow mb-4 md:mb-0">
          <h2 style={{ fontSize: '18px' }} className="text-center px-8 font-bold mb-4 text-blue-800">اطلاعات کاربری</h2>
          <div className="mb-4 px-8 text-center mx-auto flex justify-center">
            <div className="relative w-24 h-24">
              <img
                src="https://www.homsa.net/images/user_pic-225x225.png"
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-0 left-0 p-2 bg-white shadow shadow-lg rounded-full">
                <RiCameraFill className='text-pink-600 h-5 w-5' />
              </div>
            </div>
          </div>
          <div className="mb-4 px-8">
            <p className="text-gray-900 text-center">{name ? user.name : user.phone}</p>
          </div>
          <div className='border'></div>
          <div className='my-6 px-8'>
            <Link to="/bookings">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiCalendar2Line /></span>
                <span className="mr-4">رزروهای من</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/favorites">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiHeart2Line /></span>
                <span className="mr-4"> لیست علاقه مندی ها</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/bank">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiBankCard2Line /></span>
                <span className="mr-4">اطلاعات حساب بانکی</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/notifications">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiNotificationLine /></span>
                <span className="mr-4">لیست اعلان ها</span>
              </li>
            </Link>
          </div>

          <div className='my-6 px-8'>
            <Link to="/support">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiCustomerService2Line /></span>
                <span className="mr-4">پشتیبانی</span>
              </li>
            </Link>
          </div>
          <div className='my-6 px-8'>
            <Link to="/logout">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-gray-400"><RiLogoutBoxRLine /></span>
                <span className="mr-4">خروج</span>
              </li>
            </Link>
          </div>
        </div>

        {/* Update User Information Column 2 */}
        <div className="w-full md:w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow mx-6">
          <h2 style={{ fontSize: '18px' }} className="font-bold mx-4 my-2 text-blue-800">ویرایش اطلاعات</h2>
          <form onSubmit={updateUser}>
            <div className='flex flex-col md:flex-row p-2 rtl mt-2'>
              {/* col 1 */}
              <div className="w-full py-6 bg-white rounded-lg mx-2">
                <div className="mb-4">
                  <label style={{ fontSize: '16px' }} className="block text-gray-700 text-sm mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    id="name"
                    name='name'
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-200"
                    style={{ borderRadius: '5px', padding: '15px' }}
                  />
                </div>
                <div className="mb-4">
                  <label style={{ fontSize: '16px' }} className="block text-gray-700 text-sm mb-2">نام کاربری</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-200"
                    style={{ borderRadius: '5px', padding: '15px' }}
                  />
                </div>
                <div className="mb-4">
                  <label style={{ fontSize: '16px' }} className="block text-gray-700 text-sm mb-2">ایمیل</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-200"
                    style={{ borderRadius: '5px', padding: '15px' }}
                  />
                </div>
                <div className="mb-4">
                  <label style={{ fontSize: '16px' }} className="block text-gray-700 text-sm mb-2">شماره همراه</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-200"
                    style={{ borderRadius: '5px', padding: '15px' }}
                  />
                </div>
              </div>

              {/* col 2 */}
              <div className="w-full py-6  bg-white rounded-lg mx-2">
                <div className="mb-4">
                  <label style={{ fontSize: '16px' }} className="block text-gray-700 text-sm mb-2">کد ملی</label>
                  <input
                    type="text"
                    id="phone"
                    name="nationalCode"
                    defaultValue={nationalCode}
                    onChange={(e) => setNationalCode(e.target.value)}
                    className="border border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-200"
                    style={{ borderRadius: '5px', padding: '15px' }}
                  />
                </div>
                <div className="mb-4">
                  <label style={{ fontSize: '16px' }} className="block text-gray-700 text-sm mb-2">استان</label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    defaultValue={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="border border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-200"
                    style={{ borderRadius: '5px', padding: '15px' }}
                  />
                </div>
                <div className="mb-4">
                  <label style={{ fontSize: '16px' }} className="block text-gray-700 text-sm mb-2">شهر</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    defaultValue={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-200"
                    style={{ borderRadius: '5px', padding: '15px' }}
                  />
                </div>
                <div className="mb-4">
                  <label style={{ fontSize: '16px' }} className="block text-gray-700 text-sm mb-2">جنسیت</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    defaultValue={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="border border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-200"
                    style={{ borderRadius: '5px', padding: '15px' }}
                  />
                </div>

              </div>
            </div>

            <div className="flex items-center justify-between px-4">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white py-4 px-8 rounded focus:outline-none focus:border-blue-200"
              >
                تغییر اطلاعات
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
