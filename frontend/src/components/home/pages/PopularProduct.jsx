import React from 'react'
import { Link } from 'react-router-dom'
import Cctv1 from '../../../assets/images/cctv1.jpg'

const PopularProduct = () => {
  return (
    <div>
      <div className="md:px-10 max-lg:px-10 max-sm:px-5 mt-5">
        <h2 className='font-semibold text-gray-700 dark:text-gray-300 text-lg md:text-2xl py-4 uppercase'>Hot 🔥</h2>
        <div className=' pb-5'>
          <div className='mt-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4'>
            <div className=" rounded-lg shadow-md hover:shadow-xl transition duration-200 p-2 bg-gray-200 dark:bg-gray-700">
            <Link className='block'>
              <img
                src={Cctv1}
                alt='image'
                className="w-full h-40 object-cover rounded-t-md mb-4"
              />
              <div className=''>
                <h2 className="text-lg text-gray-700 dark:text-gray-200">CCTV Camera</h2>
                <p className="text-lg font-semibold tracking-tighter text-gray-600 dark:text-gray-300">$50.0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><del>$50.0</del></p>
              </div>
            </Link>
            </div>
            <div className=" rounded-lg shadow-md hover:shadow-xl transition duration-200 p-2 bg-gray-200 dark:bg-gray-700">
            <Link className='block'>
              <img
                src={Cctv1}
                alt='image'
                className="w-full h-40 object-cover rounded-t-md mb-4"
              />
              <div className=''>
                <h2 className="text-lg text-gray-700 dark:text-gray-200">CCTV Camera</h2>
                <p className="text-lg font-semibold tracking-tighter text-gray-600 dark:text-gray-300">$50.0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><del>$50.0</del></p>
              </div>
            </Link>
            </div>
            <div className=" rounded-lg shadow-md hover:shadow-xl transition duration-200 p-2 bg-gray-200 dark:bg-gray-700">
            <Link className='block'>
              <img
                src={Cctv1}
                alt='image'
                className="w-full h-40 object-cover rounded-t-md mb-4"
              />
              <div className=''>
                <h2 className="text-lg text-gray-700 dark:text-gray-200">CCTV Camera</h2>
                <p className="text-lg font-semibold tracking-tighter text-gray-600 dark:text-gray-300">$50.0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><del>$50.0</del></p>
              </div>
            </Link>
            </div>
            <div className=" rounded-lg shadow-md hover:shadow-xl transition duration-200 p-2 bg-gray-200 dark:bg-gray-700">
            <Link className='block'>
              <img
                src={Cctv1}
                alt='image'
                className="w-full h-40 object-cover rounded-t-md mb-4"
              />
              <div className=''>
                <h2 className="text-lg text-gray-700 dark:text-gray-200">CCTV Camera</h2>
                <p className="text-lg font-semibold tracking-tighter text-gray-600 dark:text-gray-300">$50.0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><del>$50.0</del></p>
              </div>
            </Link>
            </div>
            <div className=" rounded-lg shadow-md hover:shadow-xl transition duration-200 p-2 bg-gray-200 dark:bg-gray-700">
            <Link className='block'>
              <img
                src={Cctv1}
                alt='image'
                className="w-full h-40 object-cover rounded-t-md mb-4"
              />
              <div className=''>
                <h2 className="text-lg text-gray-700 dark:text-gray-200">CCTV Camera</h2>
                <p className="text-lg font-semibold tracking-tighter text-gray-600 dark:text-gray-300">$50.0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><del>$50.0</del></p>
              </div>
            </Link>
            </div>
            <div className=" rounded-lg shadow-md hover:shadow-xl transition duration-200 p-2 bg-gray-200 dark:bg-gray-700">
            <Link className='block'>
              <img
                src={Cctv1}
                alt='image'
                className="w-full h-40 object-cover rounded-t-md mb-4"
              />
              <div className=''>
                <h2 className="text-lg text-gray-700 dark:text-gray-200">CCTV Camera</h2>
                <p className="text-lg font-semibold tracking-tighter text-gray-600 dark:text-gray-300">$50.0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><del>$50.0</del></p>
              </div>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularProduct
