import { Link } from "react-router-dom";
import TrendingFlatOutlinedIcon from '@mui/icons-material/TrendingFlatOutlined';
// import Listacc from '../assets/image/LST-LOGO-COLOURED-01.svg'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState, useEffect } from "react";
import { Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {



    return ( 
    <>
    
    <footer className="bg-cyan-500 dark:bg-cyan-950 w-full flex flex-col items-center shadow-lg">
           
            <div className=" w-full flex flex-wrap justify-between gap-4 p-6 border-b border-slate-950">
               <div className=" flex flex-col  gap-4 max-lg:w-full pb-6">
                    <Link className=" flex gap-2 items-center"> 
                        <img className=" w-auto h-12" src='' alt="img" />
                        {/* <h1 className=" uppercase max-lg:hidden dark:text-gray-300 font-medium text-xl ">The CodeCraftHub</h1> */}
                    </Link>
                    <p className=" dark:text-gray-300">High quality coding education maintained by an open source community.</p>
                    <div className="flex gap-2 text-gray-400 dark:text-gray-600">
                        <Link to='https://github.com/cyberspacetechhub' className=" dark:hover:text-gray-300 hover:text-gray-900"><GitHubIcon /></Link>
                        <Link className=" hover:text-blue-700"><FacebookOutlinedIcon /></Link>
                        <Link className=" hover:text-red-500"><Instagram /></Link>
                        <Link className=" hover:text-cyan-400"><Twitter /></Link>
                    </div>
               </div>

               <div className=" leading-9">
                <h3 className="font-bold pb-2 dark:text-gray-300">About Us</h3>
                <ul>
                    <li className=" dark:text-gray-300">About</li>
                </ul>
               </div>

               <div className="">
                    <h3  className=" font-bold pb-3 dark:text-gray-300">Support</h3>
                    <ul>
                        <li className=" dark:text-gray-300">Contact Us</li>
                    </ul>
               </div>

               <div className="">
                    <h3 className=" font-bold pb-4 dark:text-gray-300">Guides</h3>
                    <ul>
                        <li className=" dark:text-gray-300">Community guides</li>
                        <li className=" dark:text-gray-300">Installation guides</li>
                    </ul>
               </div>

               <div className="">
                    <h3 className=" font-bold pb-4 pr-20 dark:text-gray-300">Legal</h3>
                    <ul>
                        <li className=" dark:text-gray-300">Terms</li>
                        <li className=" dark:text-gray-300">Privacy</li>
                    </ul>
               </div>
            </div>
            <div className=" p-8 w-full">
                <span className="font-semibold dark:text-gray-300">
                © 2025 Cyberspace Tech Hub. All rights reserved
                </span>
            </div>
        </footer>

    </> 
    );
}
 
export default Footer;