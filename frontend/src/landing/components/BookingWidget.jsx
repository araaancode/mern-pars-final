import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import AddressLink from "./AddressLink";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/teal.css";



export default function BookingWidget({ house }) {

  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());

  const [numberOfGuests, setNumberOfGuests] = useState(1);



  let numberOfNights = 0;
  // if (checkIn && checkOut) {
  //   numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  // }

  const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null

  async function bookHouse(e) {
    e.preventDefault();


    // await axios.post('/api/users/book-house', {
    //   house: house._id,
    //   house: house.owner,
    //   price: numberOfNights * house.price,
    //   checkIn,
    //   checkOut,
    //   guests: numberOfGuests
    // }, {
    //   headers: {
    //     'authorization': 'Bearer ' + userToken
    //   }
    // }).then((res) => {
    //   console.log(res);
    // }).catch((error) => {
    //   console.log(error);
    // })

    const url = '/api/users/book-house';

    const data = {
      house: house._id,
      owner: house.owner,
      checkIn:checkInValue,
      checkOut:checkOutValue,
      price: house.price,
      guests: numberOfGuests
    };

    // Define the headers, including the Authorization header
    const headers = {
      'authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    };

    await axios.post(url, data, { headers: headers })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }



  return (
    <div dir="rtl" className="bg-white border p-8 rounded-2xl">
      
      <div className="text-sm text-center text-gray-700 flex justify-between">
        <p style={{ fontSize: '16px' }} className="inline">قیمت به ازای هر شب/  <b style={{ fontSize: "20px" }}>45550 تومان</b> </p>
        <AddressLink></AddressLink>
      </div>
      <div style={{ borderRadius: '5px' }} className="border mt-4">
        <form onSubmit={bookHouse}>
          <div className="flex">
            <div className="py-3 px-4">
              <label className="mx-3 py-4" style={{ fontSize: '18px' }}>تاریخ ورود:</label>
            
              <DatePicker
                value={checkInValue}
                onChange={setCheckInValue}
                calendar={persian}
                locale={persian_fa}
                className="blue"
                style={{ border: 'none' }}
              />
            </div>
            <div className="w-px bg-gray-300"></div>
            <div className="py-3 px-4 border-l">
              <label className="mx-3 py-4" style={{ fontSize: '18px' }}>تاریخ خروج:</label>
              {/* <input type="date" value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)}
              className="mt-2"
            /> */}
              <DatePicker
                value={checkOutValue}
                onChange={setCheckOutValue}
                calendar={persian}
                locale={persian_fa}
                className="blue"
                style={{ border: 'none' }}
              />


            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>تعداد مهمان ها:</label>
            <input style={{ borderRadius: '5px' }} type="number" className="focus:outline-blue-200"
              value={numberOfGuests}
              onChange={ev => setNumberOfGuests(ev.target.value)} />
          </div>
          <button type="submit" style={{ fontSize: '18px' }} className="bg-transparent hover:bg-blue-800 text-blue-700 font-bold hover:text-white py-4 px-4 border border-blue-500 hover:border-transparent rounded mt-4 w-full">
            رزرو این اقامتگاه
            {numberOfNights > 0 && (
              <span> {numberOfNights * house.price}</span>
            )}
          </button>
        </form>
      </div>

    </div>
  );
}