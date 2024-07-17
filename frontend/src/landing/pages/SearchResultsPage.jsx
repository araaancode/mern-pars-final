import React, { useState, useEffect } from 'react';
import HouseCard from '../components/HouseCard';
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer"
import { RiTentLine, RiUser3Fill, RiSearchLine } from "@remixicon/react";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"

const itemsPerPage = 8;

const SearchResultsPage = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()


  // search functionality
  const city = window.location.search.split("=")[1];

  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    setError(null);


    async function searchHouses() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      try {
        const response = await axios.post('/api/users/search-houses', { city: "rasht" }, config);
        console.log(response.data.houses);
        setHouses(response.data.houses)
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    searchHouses()
  }, [city])


  // page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currenthouses = houses.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <>
      <header className="flex justify-between mb-2 px-10 pt-6 items-center">
        <Link to={'/'} className="flex items-center gap-1">
          <RiTentLine className="w-12 h-12" />
        </Link>

        <div className="flex jusrify-center">
          <input type="text" className="border border-gray-700" />
          <RiSearchLine />
        </div>


        <Link to={userInfo ? '/profile' : '/login'} className="flex items-center rounded-lg py-1 px-4">

          {!!userInfo && (
            <div className="">
              {userInfo.phone}
            </div>
          )}

          <div className="rounded-full overflow-hidden">
            <RiUser3Fill className="w-6 h-6  mr-2" />
          </div>
        </Link>

      </header>
      <div className="border shadow shadow-lg"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {currenthouses.map(house => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array(Math.ceil(houses.length / itemsPerPage)).fill().map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded-full mb-8 ${currentPage === index + 1 ? 'bg-blue-700 text-white' : 'bg-white text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
