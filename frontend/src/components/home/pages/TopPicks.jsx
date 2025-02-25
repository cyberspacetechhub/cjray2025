import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Cctv1 from '../../../assets/images/cctv1.jpg'
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import baseUrl from '../../../shared/baseURL';
import { useQuery } from 'react-query';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TopPicks = () => {
  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseUrl}product`
  const location = useLocation();
  const navigate = useNavigate();

  const getproducts = async () => {
    const result = await fetch(url, auth.accessToken);
    return result.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["products"],
    getproducts,
    { keepPreviousData: true, 
        staleTime: 10000,
        refetchOnMount:"always" }
  );

  console.log(data)
  const products = data?.products || [];

// Filter products where category is "Smart Lock"
const topPicks = products.filter(product => product.category === "Selfie Sticks & Tripods");
console.log(topPicks)
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 250;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 250;
    }
  };

  return (
    <div className='bg-gray-300 dark:bg-gray-700 mt-5'>
      {
        location.pathname === '/' ? (
          <div className="md:px-10 max-lg:px-10 max-sm:px-5">
        <h2 className='font-semibold text-gray-700 dark:text-gray-300 text-lg md:text-2xl py-4 inline-flex items-center'>Top Picks for You 🔝</h2>
        <div className=' pb-5 relative'>
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 block md:hidden"
          onClick={scrollLeft}
        >
          <ChevronLeft size={24} />
        </button>
        <div 
          ref={scrollContainerRef}
          className="mt-5 md:grid md:grid-cols-6 gap-4 overflow-x-auto flex md:">
          {topPicks.map((product, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md hover:shadow-xl transition duration-200 p-2 bg-gray-200 dark:bg-gray-600 w-60 flex-shrink-0 md:w-auto"
            >
              <Link 
                to={`/productdetails/${product._id}`}
                className="block w-full"
              >
                <div>
                  <img
                    src={product.coverImage}
                    alt="image"
                    className="w-full h-40 object-cover rounded-t-md mb-4"
                  />
                </div>
                <div>
                  <h2 className="text-lg text-gray-700 dark:text-gray-200">{product.name}</h2>
                  <p className="text-lg font-semibold tracking-tighter text-gray-600 dark:text-gray-300">
                    &#8358;{product.price.toLocaleString('en-US')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <del>$50.0</del>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 block md:hidden"
          onClick={scrollRight}
        >
          <ChevronRight size={24} />
        </button>
        </div>
        <div className='text-center py-2'>
          <Link to='selfie_sticks_tripods' className='underline text-blue-600'>
            View All
          </Link>
        </div>
      </div>
        ) : (
          <div className="md:px-10 max-lg:px-10 max-sm:px-5 mt-5">
          <input onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-5" type="button" value="Back" />
        <h2 className='font-semibold text-gray-700 dark:text-gray-300 text-lg md:text-2xl py-4 uppercase'>Top Picks for You 🔝</h2>
        <div className=' pb-5'>
          <div className='mt-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {topPicks.map((product, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md hover:shadow-xl transition duration-200 p-2 bg-gray-200 dark:bg-gray-600"
            >
              <Link 
                to={`/productdetails/${product._id}`}
                className="block w-full"
              >
                <div>
                  <img
                    src={product.coverImage}
                    alt="image"
                    className="w-full h-40 object-cover rounded-t-md mb-4"
                  />
                </div>
                <div>
                  <h2 className="text-lg text-gray-700 dark:text-gray-200">{product.name}</h2>
                  <p className="text-lg font-semibold tracking-tighter text-gray-600 dark:text-gray-300">
                    &#8358;{product.price.toLocaleString('en-US')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <del>$50.0</del>
                  </p>
                </div>
              </Link>
            </div>
          ))}
          </div>
        </div>
      </div>
        )
      }
    </div>
  )
}

export default TopPicks
