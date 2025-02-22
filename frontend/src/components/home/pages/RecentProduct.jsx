import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Cctv1 from '../../../assets/images/cctv1.jpg'
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import baseUrl from '../../../shared/baseURL';
import { useQuery } from 'react-query';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const RecentProduct = () => {
  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseUrl}product`

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
    <div className='bg-cyan-500 dark:bg-cyan-950'>
      <div className="md:px-10 max-lg:px-10 max-sm:px-5">
        <h2 className='font-semibold text-gray-700 dark:text-gray-300 text-lg md:text-2xl py-4'>New Arrivals 🆕</h2>
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
          {data?.products?.map((product, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md hover:shadow-xl transition duration-200 p-2 bg-gray-200 dark:bg-cyan-800 w-60 flex-shrink-0 md:w-auto"
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
                    &#8358;{parseFloat(product.price.$numberDecimal).toLocaleString('en-US')}
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
      </div>
    </div>
  )
}

export default RecentProduct
