import React, { useState, useEffect } from 'react';
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, sendOTP, verifyOTP } from "../features/auth/authActions"
import Spinner from "../components/Spinner"

const LoginPage = () => {

  // hooks
  const { register, handleSubmit } = useForm()

  const [code, setCode] = useState('');


  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  // redirect authenticated user to profile screen
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/profile')
  //   }
  // }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
    dispatch(sendOTP(data.phone))
  }

  const verifyForm = (data) => {
    let sendData = {phone:"09383901146",code:"54563"}
    dispatch(verifyOTP(sendData))
  }



  // arrow functions
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <div dir="rtl" className="flex justify-center items-center h-screen">
      {userInfo ? (
          <div className="w-full max-w-md p-8 space-y-4 bg-white rounded border">
            <h2 className="text-xl font-bold text-gray-700">تایید کد</h2>
            <p className='text-gray-500 mt-1 mb-4'>کد ارسال شده را در زیر وارد کنید. </p>
            <form className="space-y-4" onSubmit={handleSubmit(verifyForm)}>
              <div>
                <label className="block mb-2 mt-6 text-sm font-medium text-gray-700">
                  کد تایید
                </label>
                <input style={{ borderRadius: '6px' }}
                  type="text"
                  name='code'
                  className="w-full text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded-sm p-2 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  {...register('code')}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded mb-10 p-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {loading ? <Spinner /> : 'تایید کد'}
              </button>
            </form>
          </div> 
          ) : (
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded border">
          <h2 className="text-xl font-bold text-gray-700">ورود</h2>
          <p className='text-gray-500 mt-1 mb-4'>برای ورود شماره موبایل خود را وارد کنید. </p>
          <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
            <div>
              <label className="block mb-2 mt-6 text-sm font-medium text-gray-700">
                شماره تلفن
              </label>
              <input style={{ borderRadius: '6px' }}
                type="text"
                className="w-full text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded-sm p-2 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                {...register('phone')}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">
                رمز عبور
              </label>
              <div className="relative mb-4">
                <input style={{ borderRadius: '6px' }}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full focus text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded-sm p-2 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="رمز عبور"
                  {...register('password')}
                />
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <RiEyeOffLine className="h-5 w-5 text-gray-500" />
                  ) : (
                    <RiEyeLine className="h-5 w-5 text-gray-500" />
                  )}
                </div>


             </div> 
            </div>
            <button
              type="submit"
              className="w-full rounded mb-10 p-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            > 
              {loading ? <Spinner /> : 'ورود'}
            </button>
            <p className='text-sm text-gray-800'>حساب ندارید؟ <a href='/register' className='hover:text-blue-800 hover:cursor-pointer'>ثبت نام</a></p>
          </form> 
        </div >
      )}

    </div >
  );
};

export default LoginPage;