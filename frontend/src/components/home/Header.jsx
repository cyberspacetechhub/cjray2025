import React, { useState, useReducer } from "react";
import { Link, Navigate } from "react-router-dom";
import Signup from "../auth/Signup";
import Signin from "../auth/Signin";
import { useLocation } from "react-router-dom";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "openLogin":
      return { login: !state.login };
    case "register":
      return { register: !state.register };
    default:
      state;
  }
};

const Header = () => {
  const { auth } = useContext(AuthContext);  // Accessing auth state
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [state, dispatch] = useReducer(reducer, {
    login: false,
    register: false,
  });

  const [showNav, setShowNav] = useState(false);

  // handle show nav
  const handleShowNav = () => {
    setShowNav(!showNav);
  };

  const isSmallScreen = window.innerWidth <= 1024;
  return (
    <div className="">
      <div className="bg-blue-500 dark:bg-gray-500 text-white py-2">
        <p className=" text-center font-semibold tracking-wide text-xl">Your home of quality and ultimate gadgets</p>
      </div>
      <div className="sticky top-16 w-full bg-white dark:bg-gray-900 ">
      <header className="md:px-10 max-lg:px-10">
        <nav className="py-4">
          <div className="flex items-center justify-between gap-5">
              <div className="w-[10re] p-1">
              <Link to='/' className=" flex justify-start items-center">      
                <h1 className="text-4xl max-sm:text-3xl font-bold text-center text-gray-700 dark:text-gray-300">CjRayVest</h1>
              </Link>
              </div>
              <div 
                className={`lg:flex flex-wrap ${isSmallScreen && showNav ? 'flex flex-col absolute top-16 md:top-20 left-0 w-full md:w-80 bg-gray-200 dark:bg-gray-900 pl-10 py-5 transition-all ease-in-out transform translate-y-0 opacity-100' : 'hidden'} gap-10 lg:gap-4 transition-all durablue-500 ease-in-out transform opacity-100`}>
                <Link
                  to='/'
                  onClick={handleShowNav}
                  className={location.pathname === '/' ? 'text-blue-500 font-normal tracking-wide text-start text-lg hover:text-gray-300' : 'font-normal tracking-wide text-start text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500'}
                >
                  Home
                </Link>
              
                <Link to='/smartlocks' onClick={handleShowNav} className={location.pathname === '/smartlocks' ? 'text-blue-500 font-normal tracking-wide text-start text-lg hover:text-gray-300' : 'font-normal tracking-wide text-start text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500'}>
                  Real Estate
                </Link>
                <Link to='/smartlocks' onClick={handleShowNav} className={location.pathname === '/smartlocks' ? 'text-blue-500 font-normal tracking-wide text-start text-lg hover:text-gray-300' : 'font-normal tracking-wide text-start text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500'}>
                  Smart Locks
                </Link>
                <Link to='/kitchenutls' onClick={handleShowNav} className={location.pathname === '/kitchenutls' ? 'text-blue-500 font-normal tracking-wide text-start text-lg hover:text-gray-300' : 'font-normal tracking-wide text-start text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500'}>
                  Kitchen Utensils
                </Link>
                <Link to='/grants' onClick={handleShowNav} className={location.pathname === '/grants' ? 'text-blue-500 font-normal tracking-wide text-start text-lg hover:text-blue-500' : 'font-normal tracking-wide text-start text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500'}>
                  Security Gadgets
                </Link>
                <Link to='/kitchenutls' onClick={handleShowNav} className={location.pathname === '/kitchenutls' ? 'text-blue-500 font-normal tracking-wide text-start text-lg hover:text-gray-300' : 'font-normal tracking-wide text-start text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500'}>
                  Electrical Gadgets
                </Link>
                <Link to='/kitchenutls' onClick={handleShowNav} className={location.pathname === '/kitchenutls' ? 'text-blue-500 font-normal tracking-wide text-start text-lg hover:text-gray-300' : 'font-normal tracking-wide text-start text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500'}>
                  Solar Lights
                </Link>
              </div>
              <div>
                
              </div>
              <div className="flex items-center gap-4">
              <button onClick={() => {toggleDarkMode()}}>
                  {
                    !isDarkMode ? 
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>
                    </span> :
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>
                      {isDarkMode}
                    </span>
                  }
                </button>
                {
                  auth.user || auth.company ? (
                    <button onClick={() => navigate( auth.roles === 'Company' ? '/company': auth.user.type === 'Cordinator' ? '/cordinator' : '/')} className=" text-start  w-40  p-1">
                      <span className=" text-white hover:text-blue-400">Dashboard</span>
                      
                    </button>
                  ) : (
                    <button 
                    onClick={() => {
                      dispatch({ type: "openLogin" });
                      handleShowNav();
                    }}
                    className=" text-start">
                      <span className=" text-gray-700 dark:text-gray-300 font-semibold hover:text-blue-400 hidden lg:block text-nowrap">Sign Up Free</span>
                    </button>
                  )
                }
                
                <button
                onClick={handleShowNav} 
                className="lg:hidden transition-transform duration-300 ease-in-out transform hover:scale-110"
                >
                  { !showNav ? 
                    <span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="34px" 
                        viewBox="0 -960 960 960" 
                        width="34px"
                        className=" text-gray-700 dark:text-gray-300"
                        fill="currentColor"
                        >
                        <path d="M360-240v-60h480v60H360Zm0-210v-60h480v60H360ZM120-660v-60h720v60H120Z" 
                        />
                      </svg>
                    </span>:
                    <span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="34px" 
                        viewBox="0 -960 960 960" 
                        width="34px"
                        className=" text-gray-300"
                        fill="currentColor"
                        >
                        <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
                        />
                      </svg>
                    {showNav}
                    </span>
                  }
                </button>
              </div>
            </div>
            </nav>
      </header>
    </div>
      <div className="">
      
      <Signup
          open={state.register}
          handleClose={dispatch}
        />{" "}
        
        <Signin
          open={state.login}
          handleCloseLogin={dispatch}
        />
    </div>
    </div>
  )
}

export default Header
