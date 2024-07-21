import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import AddressLink from "./AddressLink";


import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/teal.css";


export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());

  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    const response = await axios.post('/api/bookings', {
      checkIn, checkOut, numberOfGuests, name, phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div dir="rtl" className="bg-white border p-8 rounded-2xl">
      <div className="text-sm text-center text-gray-700 flex justify-between">
        <p style={{ fontSize: '16px' }} className="inline">قیمت به ازای هر شب/  <b style={{ fontSize: "20px" }}>45550 تومان</b> </p>
        <AddressLink></AddressLink>
      </div>
      <div style={{ borderRadius: '5px' }} className="border mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label className="mx-3 py-4" style={{ fontSize: '18px' }}>تاریخ ورود:</label>
            {/* <input type="date"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)}
              className="mt-2"
            /> */}
            <DatePicker
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)}
              calendar={persian}
              locale={persian_fa}
              className="blue focus:outline-none"
              style={{ border: 'none', borderRadius: '5px', marginTop: '2px' }}
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
              value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)}
              calendar={persian}
              locale={persian_fa}
              className="blue"
              style={{ border: 'none', borderRadius: '5px', marginTop: '2px' }}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>تعداد مهمان ها:</label>
          <input style={{ borderRadius: '5px' }} type="number" className="focus:outline-blue-200"
            value={numberOfGuests}
            onChange={ev => setNumberOfGuests(ev.target.value)} />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>نام و نام خانوادگی</label>
            <input type="text"
              value={name}
              onChange={ev => setName(ev.target.value)} />
            <label>شماره همراه:</label>
            <input type="tel"
              value={phone}
              onChange={ev => setPhone(ev.target.value)} />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} style={{ fontSize: '18px' }} className="bg-transparent hover:bg-blue-800 text-blue-700 font-bold hover:text-white py-4 px-4 border border-blue-500 hover:border-transparent rounded mt-4 w-full">
        رزرو این اقامتگاه
        {numberOfNights > 0 && (
          <span> {numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}