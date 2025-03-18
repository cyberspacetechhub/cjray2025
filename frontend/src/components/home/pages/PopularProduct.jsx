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

const PopularProduct = () => {
  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseUrl}product`
  const location = useLocation();
  const navigate = useNavigate();

  const categories = ["Smart Homes & Automation", "Gadgets & Electronics"];
const categoryParam = categories
  .map(cat => `category=${encodeURIComponent(cat)}`)
  .join("&"); // ✅ Use & to separate multiple category values

const getproducts = async () => {
  const result = await fetch(`${url}/category?${categoryParam}`, auth.accessToken);
  return result.data;
};

const { data, isError, isLoading, isSuccess } = useQuery(
  ["products", categories], // ✅ Include categories in query key for cache updates
  getproducts,
  { 
    keepPreviousData: true, 
    staleTime: 10000,
    refetchOnMount: "always" 
  }
);


  console.log(data)
  const products = data?.products || [];

// Filter products where category is "Smart Lock"
const PopularProducts = products.filter(product => 
  product.category === "Smart Homes & Automation" || product.category === "Gadgets & Electronics"
);
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
    <div className='bg-gray-300 dark:bg-gray-700 mt-5 relative'>
      {
        location.pathname === '/' ? (
          <div className="md:px-10 max-lg:px-10 max-sm:px-5">
        <h2 className='font-semibold text-gray-700 dark:text-gray-300 text-lg md:text-2xl py-4 inline-flex items-center'>Hot 🔥</h2>
        <div className=' pb-5 z-0'>
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 block md:hidden"
          onClick={scrollLeft}
        >
          <ChevronLeft size={24} />
        </button>
        <div 
          ref={scrollContainerRef}
          className="mt-5 md:grid md:grid-cols-6 gap-4 overflow-x-auto flex">
          {PopularProducts.map((product, index) => (
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
          <Link to='popularproducts' className='underline text-blue-600'>
            View All
          </Link>
        </div>
      </div>
        ) : (
          <div className="md:px-10 max-lg:px-10 max-sm:px-5 mt-5 bg-gray-300 dark:bg-gray-700">
          <input onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-5" type="button" value="Back" />
        <h2 className='font-semibold text-gray-700 dark:text-gray-300 text-lg md:text-2xl py-4 uppercase'>Hot 🔥</h2>
        <div className=' pb-5'>
          <div className='mt-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {PopularProducts.map((product, index) => (
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

export default PopularProduct
