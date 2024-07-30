import React, { useState, useEffect, useRef } from 'react'
import ExtraLinks from '../components/ExtraLinks'
import { useNavigate } from 'react-router-dom'
import { RiUserLocationFill, RiSearchLine, RiLoader2Fill } from "@remixicon/react";
import axios from "axios"

// icons
import HomeIcon from '@iconscout/react-unicons/icons/uil-home'
import BuildingOfficeIcon from '@iconscout/react-unicons/icons/uil-house-user'
import BuildingIcon from '@iconscout/react-unicons/icons/uil-building'
import SunIcon from '@iconscout/react-unicons/icons/uil-sun'
import SwimmerIcon from '@iconscout/react-unicons/icons/uil-swimmer'
import TreeIcon from '@iconscout/react-unicons/icons/uil-trees'
import StarIcon from '@iconscout/react-unicons/icons/uil-star'
import ClockIcon from '@iconscout/react-unicons/icons/uil-clock'

import "./navbar.css"


import { BiSearch } from "react-icons/bi";

// icons 
import { PiHouseLight } from "react-icons/pi";
import { PiWarehouseLight } from "react-icons/pi";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { PiBeachBallLight } from "react-icons/pi";
import { PiSwimmingPoolLight } from "react-icons/pi";
import { PiTreeLight } from "react-icons/pi";
import { PiGiftLight } from "react-icons/pi";
import { PiSealPercentLight } from "react-icons/pi";
import { PiGlobeHemisphereEastLight } from "react-icons/pi";

import { SlCalender } from "react-icons/sl";
import { PiArrowLeftBold } from "react-icons/pi";

// end icons

// import DatePicker from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";


import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// import "react-multi-date-picker/styles/colors/teal.css";
import "react-multi-date-picker/styles/backgrounds/bg-white.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
    const navigate = useNavigate();
    const [checkInValue, setCheckInValue] = useState(new Date());
    const [checkOutValue, setCheckOutValue] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [houses, setHouses] = useState([])
    const [count, setCount] = useState(0)

    const [city, setCity] = useState(null);

    const cityChange = (e) => {
        setCity(e.target.value);
    }

    const decrement = (e) => {
        setCount(count - 1)
    }


    const increment = (e) => {
        setCount(count + 1)
    }


    const [dates, setDates] = useState([null, null]);


    const searchHouse = async (e) => {
        e.preventDefault()

        if ((city.city === null) && (dates === null) && (count === null)) {
            toast.error("همه فیلدها باید وارد شوند!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.post('/api/users/search-houses', { city: city.city });
                setHouses(res.data.houses)
                navigate(`/search-houses?city=${city.city}&dates=${dates}&count=${count}`);

            } catch (err) {
                console.log(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
    }


    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const items = [
        { id: 1, image: 'https://cdn-icons-png.flaticon.com/128/15486/15486076.png', city: 'isfahan', cityName: 'اصفهان' },
        { id: 2, image: 'https://cdn-icons-png.flaticon.com/128/15486/15486062.png', city: 'shiraz', cityName: 'شیراز' },
        { id: 3, image: 'https://cdn-icons-png.flaticon.com/128/15486/15486078.png', city: 'yazd', cityName: 'یزد' },
        { id: 4, image: 'https://cdn-icons-png.flaticon.com/128/15486/15486084.png', city: 'mashhad', cityName: 'مشهد' },
        { id: 5, image: 'https://cdn-icons-png.flaticon.com/128/15486/15486074.png', city: 'tehran', cityName: 'تهران' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (

        <div>
            <form action='/search-houses' onSubmit={searchHouse}>

                <div style={{
                    width: '800px',
                    marginTop: '70px'
                }} className="flex rounded-full gap-2 bg-white text-center justify-between m-auto border border-gray-300 rounded-full px-4 py-2 mb-5" >
                    {/* <div className="flex items-center justify-center py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 w-6 h-6">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                        <select onChange={cityChange} id="city" name='city' className="bg-white focus:shadow-outline focus:outline-none w-100" defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled>
                                شهر
                            </option>
                            <option style={{marginTop:'5px'}} value="arak">اراک</option>
                            <option value="ardebil">اردبیل</option>
                            <option value="oromieh">ارومیه</option>
                            <option value="isfahan">اصفهان</option>
                            <option value="ahvaz">اهواز</option>
                            <option value="elam">ایلام</option>
                            <option value="bognord">بجنورد</option>
                            <option value="bandar_abbas">بندرعباس</option>
                            <option value="bosher">بوشهر</option>
                            <option value="birgand">بیرجند</option>
                            <option value="tabriz">تبریز</option>
                            <option value="tehran">تهران</option>
                            <option value="khoram_abad">خرم آباد</option>
                            <option value="rasht">رشت</option>
                            <option value="zahedan">زاهدان</option>
                            <option value="zanjan">زنجان</option>
                            <option value="sari">ساری</option>
                            <option value="semnan">سمنان</option>
                            <option value="sanandaj">سنندج</option>
                            <option value="sharekord">شهرکرد</option>
                            <option value="shiraz">شیراز</option>
                            <option value="ghazvin">قزوین</option>
                            <option value="ghom">قم</option>
                            <option value="karaj">کرج</option>
                            <option value="kerman">کرمان</option>
                            <option value="kermanshah">کرمانشاه</option>
                            <option value="gorgan">گرگان</option>
                            <option value="mashhad">مشهد</option>
                            <option value="hamedan">همدان</option>
                            <option value="yasoj">یاسوج</option>
                            <option value="yazd">یزد</option>

                        </select>
                    </div> */}

                    <div className='flex items-center justify-center'>

                        <div className="relative inline-block mx-auto" ref={dropdownRef}>
                            <div className="rounded p-1 bg-white">
                                <button
                                    className="flex items-center w-full justify-between"
                                    onClick={(e) => setIsOpen(!isOpen)}
                                    aria-haspopup="true"
                                    aria-expanded={isOpen}
                                >
                                    {city ? (
                                        <span className="flex items-center">
                                            <img
                                                src={city.image}
                                                alt={city.city}
                                                className="w-14 h-14 rounded-full mr-2"
                                            />
                                            {city.cityName}
                                        </span>
                                    ) : (
                                        <div className='flex items-center justify-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 w-6 h-6">
                                                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                            </svg>
                                            <input style={{ fontSize: '18px', width: '100px' }} className="mx-2 my-4 focus:outline-none" placeholder='شهر' />
                                        </div>
                                    )}
                                    <svg
                                        className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'
                                            }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {isOpen && (

                                    <div style={{ width: '800px', marginTop: '30px' }}
                                        className="absolute rounded-full shadow-lg bg-white z-10 "
                                        role="listbox"
                                        aria-labelledby="dropdown-label"
                                    >
                                        <div className="grid grid-cols-5 gap-6 px-4 py-1">
                                            {items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex flex-col items-center justify-center rounded-full cursor-pointer"
                                                    role="option"
                                                    aria-selected={city?.id === item.id}
                                                    onClick={() => {
                                                        setCity(item);
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.city}
                                                        style={{ width: "80px", height: '80px' }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>


                    <div className="border-l border-gray-300"></div>

                    {/* in */}
                    {/* <div style={{ width: '220px' }} className="flex justify-center items-center">
                        <SlCalender className='w-8 h-8 text-gray-400' />
                        <span style={{ fontSize: '18px' }} className='mx-2 text-gray-400'> ورود</span>
                        <DatePicker
                            value={checkInValue}
                            onChange={setCheckInValue}
                            calendar={persian}
                            locale={persian_fa}
                            className="blue"
                            style={{ border: 'none' }}
                        />
                    </div> */}

                    <div style={{ fontSize: '18px', width: '260px' }} className='flex justify-center items-center'>
                        <SlCalender className='w-8 h-8 text-gray-400 ml-2' />
                        <DatePicker
                            value={dates}
                            onChange={setDates}
                            range
                            calendar={persian}
                            locale={persian_fa}
                            plugins={[<DatePanel />]}
                            placeholder="انتخاب تاریخ ورود و خروج"
                            className="blue"
                            style={{
                                fontSize: "18px",
                                padding: "3px 10px",
                                border: 'none',

                            }}
                            inputClassName="custom-input"
                            monthYearSeparator="|"
                        />
                        {/* <div>
                            <p>
                                <strong>Check-in Date:</strong>{" "}
                                {dates[0] ? dates[0].format("YYYY/MM/DD") : "Not selected"}
                            </p>
                            <p>
                                <strong>Check-out Date:</strong>{" "}
                                {dates[1] ? dates[1].format("YYYY/MM/DD") : "Not selected"}
                            </p>
                        </div> */}
                    </div>


                    <div className="border-l border-gray-300"></div>
                    {/* out */}
                    {/* <div style={{ width: '220px' }} className="flex justify-center items-center">
                        <PiArrowLeftBold className='w-8 h-8 text-gray-400' />
                        <span style={{ fontSize: '18px' }} className='mx-2 text-gray-400'> خروج</span>
                        <DatePicker
                            value={checkOutValue}
                            onChange={setCheckOutValue}
                            calendar={persian}
                            locale={persian_fa}
                            className="blue"
                            style={{ border: 'none' }}
                        />
                    </div> */}
                    {/* <div className="border-l border-gray-300"></div> */}
                    {/* users count */}
                    {/* <div className='flex justify-center items-center w-30'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 w-6 h-6">
                            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                        </svg>

                        <input style={{ width: '100px', fontSize: '18px' }} type="number" placeholder="تعداد" min={1} className="placeholder-gray-500 px-3 pl-8 py-1 mr-2 outline-none transition duration-700 ease-in-out focus:shadow-outline" />
                    </div> */}

                    <div className='flex justify-center items-center w-30'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 w-6 h-6">
                            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                        </svg>
                        <label style={{ fontSize: '18px' }} htmlFor="quantity-input" className="block mx-2 mb-2 text-sm font-medium text-gray-400">تعداد</label>
                        <div className="relative flex items-center max-w-[8rem]">

                            <button onClick={decrement} type="button" className="border rounded-full border-blue-800 px-3.5 py-4 focus:outline-none">
                                <svg className="w-3 h-3 text-blue-800 font-extrabold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                            </button>

                            <p className='mx-2'>{count <= 0 ? 0 : count}</p>

                            <button onClick={increment} type="button" className="border border-blue-800 px-3.5 py-4 rounded-full focus:outline-none">
                                <svg className="w-3 h-3 text-blue-800 font-extrabold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>

                        </div>
                    </div>

                    <div className="border-l border-gray-300 w-100"></div>
                    <button type='submit' className="bg-primary text-white py-1 px-5 rounded-full">
                        {/* {loading ? <BiSearch className='w-6 h-6 font-bold' /> : <RiLoader2Fill className='w-5 h-5 font-bold' />} */}
                        <BiSearch className='w-6 h-6 font-bold' />
                    </button>
                </div>
            </form>

            {/* <nav className='flex bg-white mx-20 my-50 px-5 py-3 rounded-lg justify-between'>
                <a href="#">
                    <PiHouseLight className='w-8 h-8' />
                    <span className='mt-6 text-gray-500 text-bold font-sm hover:text-black' style={{ fontSize: '14px' }}>کلبه</span>
                </a>

                <a href="#">
                    <PiWarehouseLight className='w-8 h-8' />
                    <span className='mt-6 text-gray-500 text-bold font-sm hover:text-black' style={{ fontSize: '14px' }}>ویلا</span>
                </a>

                <a href="#">
                    <PiBuildingApartmentLight className='w-8 h-8' />
                    <span className='mt-6 text-gray-500 text-bold font-sm hover:text-black' style={{ fontSize: '14px' }}>آپارتمان</span>
                </a>

                <a href="#">
                    <PiBeachBallLight className='w-8 h-8' />
                    <span className='mt-6 text-gray-500 text-bold font-sm hover:text-black' style={{ fontSize: '14px' }}>ساحلی</span>
                </a>

                <a href="#">
                    <PiSwimmingPoolLight className='w-8 h-8' />
                    <span className='mt-6 text-gray-500 text-bold font-sm hover:text-black' style={{ fontSize: '14px' }}>استخردار</span>
                </a>

                <a href="#">
                    <PiGlobeHemisphereEastLight className='w-8 h-8' />
                    <span className='mt-6 text-gray-500 text-bold font-sm hover:text-black' style={{ fontSize: '14px' }}>بوم گردی</span>
                </a>

                <a href="#">
                    <PiGiftLight className="w-10 h-10" />
                    <span className='mt-6 text-gray-500 text-bold font-sm hover:text-black' style={{ fontSize: '14px' }}>پیشنهاد ویژه</span>
                </a>

                <a href="#">
                    <PiTreeLight className='w-8 h-8' />
                    <span className='mt-6 text-gray-500 text-bold font-sm hover:text-black' style={{ fontSize: '14px' }}>باغ </span>
                </a>

                <a href="#">
                    <PiSealPercentLight className='w-8 h-8' />
                    <span className='mt-6 text-gray-500 text-bold font-sm hover:text-black' style={{ fontSize: '14px' }}>تخفیف دار</span>
                </a>

            </nav> */}
            <ToastContainer />
        </div>
    )
}

export default Navbar