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
          <div className='px-10 md:px-40'>
            <p className='text-center my-4 tracking-wide leading-8 text-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt suscipit sint nesciunt esse nemo voluptates sed temporibus, aut enim praesentium minus dignissimos vitae iste alias nulla totam ullam quasi, odit officiis modi 
            </p>
            <p className='text-center my-4 tracking-wide leading-8 text-lg'>
              expedita. Reiciendis cumque quos minus saepe iusto quaerat aliquam, excepturi esse voluptates cupiditate iure inventore voluptatum nemo facilis enim quam ut sed quas reprehenderit, dolores quia tempore provident nobis. Aliquam distinctio quidem voluptatibus cumque deleniti exercitationem labore officia 
            </p>
            <p className='text-center pb-4 tracking-wide leading-8 text-lg'>
              dolor reprehenderit, fugit, officiis blanditiis perspiciatis ullam error ducimus sunt! Aut voluptatum fugiat nemo tenetur exercitationem, ullam beatae amet aspernatur. Voluptatibus quis quam dolorem nostrum optio suscipit corrupti, quibusdam aut.
            </p>
          </div>
          <div className='py-5'>
            <Marquee>
              <div className='flex flex-col items-center'>
                <div className='w-1/5'>
                  <img src={proud} alt="" />
                </div>
                <div>
                  <h2>Take pride in your work.</h2>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-1/5'>
                  <img className='w-full' src={promise} alt="" />
                </div>
                <div>
                  <h2>Deliver on your promises.</h2>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-1/5'>
                  <img src={supreme} alt="" />
                </div>
                <div>
                  <h2>Work with the supreme.</h2>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-1/5'>
                  <img src={search} alt="" />
                </div>
                <div>
                  <h2>Transparency in dealings</h2>
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
