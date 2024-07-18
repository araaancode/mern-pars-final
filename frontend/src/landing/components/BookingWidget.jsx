import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";


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
    <div dir="rtl" className="bg-white shadow p-8 rounded-2xl">
      <div className="text-sm text-center text-gray-700">
        <b>قیمت به ازای هر شب: 455</b>
        {/* {place.price} */}
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>تاریخ ورود:</label>
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
              className="blue"
              style={{ border: 'none' }}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>تاریخ خروج:</label>
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
              style={{ border: 'none' }}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>تعداد مهمان ها:</label>
          <input type="number"
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
      <button onClick={bookThisPlace} className="bg-transparent hover:bg-blue-800 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-4 w-full">
        رزرو این اقامتگاه
        {numberOfNights > 0 && (
          <span> {numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}