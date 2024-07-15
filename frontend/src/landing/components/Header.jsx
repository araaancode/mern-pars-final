import { Link } from "react-router-dom";
import { useContext } from "react";
// import { UserContext } from "../components/UserContext";
import ExtraLinks from "../components/ExtraLinks";
import Navbar from "../components/Navbar";

import { RiTentLine,RiUser3Fill } from "@remixicon/react";


export default function Header() {
  const { user } = "user"
  return (
    <div style={{
      backgroundImage: "url(" + "https://www.homsa.net/images/slider/slider_1656249633.png" + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height:'550px',
    }} className="mb-20 ">

      <header className="flex justify-between mb-10 px-10 py-4">
        <Link to={'/'} className="flex items-center gap-1">
          <RiTentLine className="w-8 h-8" />
        </Link>

        <Link to={user ? '/account' : '/login'} className="flex items-center rounded-lg py-1 px-4">
          <div className="rounded-full overflow-hidden">
           <RiUser3Fill className="w-8 h-8" />
          </div>

          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>

      </header>

      <Navbar />

    </div>

  );
}