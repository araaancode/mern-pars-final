import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import ExtraLinks from "../components/ExtraLinks";
import Navbar from "../components/Navbar";

import { RiTentLine, RiUser3Fill,RiSearchLine } from "@remixicon/react";


export default function Header() {


  const userToken = localStorage.getItem("userToken")

  return (
    <div style={{
      backgroundImage: "url(" + "https://wallpapercave.com/wp/wp2065959.jpg" + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '580px',
      borderBottomLeftRadius:'25px',
      borderBottomRightRadius:'25px',
    }} className="mb-20">

      <header className="flex justify-between mb-10 px-10 py-6">
        <Link to={'/'} className="flex items-center gap-1">
          <RiTentLine className="w-12 h-12 text-white" />
        </Link>

        <Link to={userToken ? '/' : '/login'} className="flex items-center rounded-lg py-1 px-4">

          {!!userToken && (
            <div className="text-white">
              {userToken}
            </div>
          )}

          <div className="rounded-full overflow-hidden">
            <RiUser3Fill className="w-5 h-5 text-white mr-2" />
          </div>
        </Link>

      </header>

      <Navbar />

    </div>

  );
}