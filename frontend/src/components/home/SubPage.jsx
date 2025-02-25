import React from 'react'
import promise from '../../assets/images/promise.png'
import proud from '../../assets/images/proudness.png'
import supreme from '../../assets/images/supreme.png'
import search from '../../assets/images/search.png'
import Marquee from "react-fast-marquee";

const SubPage = () => {
  return (
    <div className=' mt-5'>
      <div className='md:px-10 max-lg:px-10 max-sm:px-5'>
        <div>
          <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-200 text-center py-4'>Why Buy from Us?</h1>
          <div className='px-10 md:px-40 text-gray-800 dark:text-gray-300'>
            <p className='text-center my-4 tracking-wide leading-8 text-lg'>
            Protect your home and business with our top-tier security gadgets, smart locks, and surveillance systems. CjRayVest Props & Estate Ltd ensures you stay safe with cutting-edge technology designed for ultimate protection.
            </p>
            <p className='text-center my-4 tracking-wide leading-8 text-lg'>
            Control access to your property effortlessly with our advanced smart locks. Enjoy keyless entry, remote access, and real-time security alerts, all designed to give you peace of mind with seamless convenience.
            </p>
            <p className='text-center pb-4 tracking-wide leading-8 text-lg'>
            Whether you need spy cameras for discreet monitoring or high-quality lighting and tripods for content creation, our gadgets help you stay secure while producing stunning visuals. CjRayVest Props & Estate Ltd equips you for both safety and creativity. 🚀
            </p>
          </div>
          <div className='py-5'>
            <Marquee>
              <div className='flex flex-col items-center'>
                <div className='w-1/5'>
                  <img src={proud} alt="" />
                </div>
                <div>
                  <h2 className='text-gray-800 dark:text-gray-200'>Take pride in your work.</h2>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-1/5'>
                  <img className='w-full' src={promise} alt="" />
                </div>
                <div>
                  <h2 className='text-gray-800 dark:text-gray-200'>Deliver on your promises.</h2>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-1/5'>
                  <img src={supreme} alt="" />
                </div>
                <div>
                  <h2 className='text-gray-800 dark:text-gray-200'>Work with the supreme.</h2>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-1/5'>
                  <img src={search} alt="" />
                </div>
                <div>
                  <h2 className='text-gray-800 dark:text-gray-200'>Transparency in dealings</h2>
                </div>
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubPage
