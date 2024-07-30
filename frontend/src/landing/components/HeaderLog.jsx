import React from 'react'
import { RiTentLine, RiUser3Fill, RiSearchLine, RiMenuLine } from "@remixicon/react";
import { FaUserCircle, FaSearch, FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom";
import axios from "axios"


const HeaderLog = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null

    return (
        <>
            <header className="flex items-center justify-between p-4">
                {/* Site Icon on the right */}
                <div className="flex items-center space-x-2 w-1/8">
                    <Link to="/">
                        <RiTentLine className="w-12 h-12" />
                    </Link>
                </div>


                {/* Search Input in the center */}
                <div className="flex mx-auto w-6/8 justify-center items-center">
                    <div className="relative text-gray-600">
                        <input
                            style={{ padding: '12px 20px', borderRadius: '30px', margin: '2px auto' }}
                            type="text"
                            name="city"
                            placeholder="نام شهر مورد نظر را وارد کنید.."
                            className="bg-white rounded-full focus:outline-none w-full shadow rounded-full hover:shadow-md"
                        />
                        <button type="submit" className="absolute left-2 mt-2 p-3 bg-blue-800 rounded-full text-white">
                            <FaSearch className='text-sm' />
                        </button>
                    </div>
                </div>

                {/* User Icon on the left */}
                <Link to={userToken ? '/profile' : '/login'}>
                    <div style={{ width: '120px', height: '60px' }} className="flex items-center p-2 space-x-2 w-2/8 justify-end hover:border hover:rounded-full hover:shadow-lg">
                        <div className="w-10 h-10 mx-3">
                            <img
                                src="https://www.homsa.net/images/user_pic-225x225.png"
                                alt="Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <RiMenuLine className="w-6 h-6 font-bold" />
                    </div>
                </Link>

            </header>
            <div className="border border-gray-100"></div>
        </>
    )
}

export default HeaderLog