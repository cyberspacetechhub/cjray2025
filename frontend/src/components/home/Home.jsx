import React from 'react'
import HeroImg from '../../assets/images/hero.jpg'
import Header from './Header'
import Twitter from '../../assets/images/twitter.png'
import Telegram from '../../assets/images/telegram.png'
import Instagram from '../../assets/images/instagram.png'
import Facebook from '../../assets/images/facebookk.png'
import Tiktok from '../../assets/images/tiktok1.png'
import { Link } from 'react-router-dom'
import PopularProduct from './pages/PopularProduct'
import RecentProduct from './pages/RecentProduct'
import SmartLocks from './pages/SmartLocks'
import TopPicks from './pages/TopPicks'
import SubPage from './SubPage'
import Reviews from './Reviews'

const Home = () => {
  return (
    <div>
      <div>
        <div className='bg-cover bg-center bg-no-repeat w-full h-[200px] md:h-[300px] flex flex-col justify-center items-center' style={{ backgroundImage: `url(${HeroImg})` }}>
          <h2>Home of Quality Gadgets</h2>
          <p>Security Inclined, </p>
        </div>
        <div className='mt-5'>
          <h2 className='text-2xl font-bold text-center mb-5 text-gray-800 dark:text-gray-200'>Welcome to our store</h2>
          <p className='text-center mb-5 font-semibold text-gray-700 dark:text-gray-300'>You can reach out to us on our official handle below</p>
          <ul className="flex justify-center items-center gap-4">
            
            <li className=''>
                <Link className='block bg-white rounded-full p-1 w-16 h-16'>
                    
                  <img className='' src={Facebook} alt="" />
                    
                </Link>
                  <span className="uppercase text-gray-600 dark:text-gray-400 font-normal tracking-normal text-xs" >Facebook</span>
            </li>
            <li className='flex flex-col items-center'>
                <Link className='block bg-white rounded-full p-1 w-16 h-16'>
                    
                  <img className='rounded-full' src={Instagram} alt="" />
                    
                </Link>
                  <span className="uppercase text-gray-600 dark:text-gray-400 tracking-normal text-xs" >Instagram</span>
            </li>
            <li className='flex flex-col items-center'>
                <Link className='block bg-white rounded-full p-1 w-16 h-16'>
                    
                  <img className='rounded-full' src={Telegram} alt="" />
                    
                </Link>
                  <span className="uppercase text-gray-600 dark:text-gray-400 font-normal tracking-normal text-xs" >Telegram</span>
            </li>
            <li className='flex flex-col items-center'>
                <Link className='block bg-white rounded-full p-1 w-16 h-16'>
                    
                  <img className='' src={Tiktok} alt="" />
                    
                </Link>
                  <span className="uppercase text-gray-600 dark:text-gray-400 font-normal tracking-normal text-xs" >Tiktok</span>
            </li>
            <li className='flex flex-col items-center'>
                <Link className='block bg-white rounded-full p-1 w-16 h-16'>
                    
                  <img className='rounded-full' src={Twitter} alt="" />
                    
                </Link>
                  <span className="uppercase text-gray-600 dark:text-gray-400 tracking-normal text-xs" >Twitter</span>
            </li>
        </ul>
        </div>
        <div>
          <PopularProduct />
        </div>
        <div>
          <RecentProduct />
        </div>
        <div>
          <SmartLocks />
        </div>
        <div>
          <TopPicks />
        </div>
        <div>
          <SubPage />
        </div>
        <div>
          <Reviews />
        </div>
      </div>
    </div>
  )
}

export default Home
