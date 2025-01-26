import { useState } from "react";
import { Link } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Avatar from '../../../assets/images/profile.png'
import { useTheme } from "../../../context/ThemeContext";

const AdminHeader = ({ setAside }) => {
  const {auth, setAuth, persist, setPersist} = useContext(AuthContext)
  const { isDarkMode, toggleDarkMode } = useTheme();
  // console.log(auth);
  
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <ClickAwayListener
            onClickAway={() => {
              setAside(false);
            }}
          >
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
              onClick={() => setAside((aside) => !aside)}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <span className="sr-only">Toggle sidebar</span>
            </button>
          </ClickAwayListener>
          <Link
            to="/admin"
            className="flex items-center justify-between mr-4"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-nowrap text-gray-800 dark:text-gray-300">
              <span className="">Admin</span> Dashboard
            </span>
          </Link>
          {/* <form
            action="#"
            method="GET"
            className="hidden md:block md:pl-2"
          >
            <label
              htmlFor="topbar-search"
              className="sr-only"
            >
              Search
            </label>
            <div className="relative md:w-64 lg:w-96">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                name="email"
                id="topbar-search"
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-primary-500 block w-full pl-10 p-2.5"
                placeholder="Search"
              />
            </div>
          </form> */}
        </div>
        {/* <div className="flex items-center lg:order-2">
          <button
            type="button"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Toggle search</span>
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              ></path>
            </svg>
          </button>
        </div> */}
        <div className="flex gap-10 items-center">
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
        <div className="border border-gray-200 dark:border-gray-800 h-12 w-12 md:h-16 md:w-16 rounded-full">
          <Link to={`/admin/profile/${auth?.user?._id}`}>
            <img src={auth?.user?.profile ? auth.user.profile : Avatar} alt="" className="w-full h-full rounded-full" />
          </Link>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
