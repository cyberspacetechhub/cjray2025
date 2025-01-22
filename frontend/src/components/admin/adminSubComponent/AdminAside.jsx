import { Link, useLocation} from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../../auth/LogoutModal";


const AdminAside = ({ aside, setAside }) => {
  const location = useLocation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleOpenLogoutModal = () => setOpenLogoutModal(true);
  const handleCloseLogoutModal = () => setOpenLogoutModal(false);
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-52 h-full pb-3 pt-20 transition-transform  bg-white dark:bg-gray-900 border-r border-gray-100 max-sm:w-96 md:translate-x-0 ${
        aside ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px- h-full bg-white dark:bg-gray-800 max-sm:mt-6">
        <ul className="space-y-4 pl-0 pr-4">
          <li>
            <Link
              to="/admin"
              className={`flex items-center p-2 text-base font-medium text-gray-900 dark:text-gray-300 rounded-r-lg border-l-4 border-gray-50 hover:border-green-600 ${location.pathname === '/admin' ? 'border-green-600 text-green-600' : ''} hover:bg-gray-100 group`}
            >
              <svg
                aria-hidden="true"
                className={`w-7 h-7 ml-2 text-gray-500 dark:text-gray-300 transition duration-75 group-hover:text-green-900 ${location.pathname === '/admin' ? 'text-green-900' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Overview</span>
            </Link>
          </li>

        </ul>
        <ul className="pt-5 mt-5 pl-0 pr-4 space-y-4 border-t border-gray-200">
         
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center border-l-4 border-gray-50 hover:border-green-600 p-2 text-base font-medium text-gray-900 rounded-r-lg ${location.pathname === '/admin/users' ? 'border-green-600 text-green-600' : ''} transition duration-75 hover:bg-gray-100 group`}
            >
              <svg
                aria-hidden="true"
                className={`flex-shrink-0 w-7 h-7 ml-2 text-gray-500 transition duration-75 group-hover:text-gray-900 ${location.pathname === '/admin/users' ? 'text-green-600' : ''}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14 c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2 c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14 c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M16.24,13.65c-1.17-0.52-2.61-0.9-4.24-0.9 c-1.63,0-3.07,0.39-4.24,0.9C6.68,14.13,6,15.21,6,16.39V18h12v-1.61C18,15.21,17.32,14.13,16.24,13.65z M8.07,16 c0.09-0.23,0.13-0.39,0.91-0.69c0.97-0.38,1.99-0.56,3.02-0.56s2.05,0.18,3.02,0.56c0.77,0.3,0.81,0.46,0.91,0.69H8.07z M12,8 c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,8,12,8 M12,6c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3s3-1.34,3-3 C15,7.34,13.66,6,12,6L12,6z"/>
              </svg>
              <span className="ml-3">All Users</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleOpenLogoutModal}
              to="#"
              className="flex items-center border-l-4 w-full border-gray-50 hover:border-red-600 p-2 text-base font-medium text-red-500 hover:text-red-700 rounded-r-lg transition duration-75 hover:bg-gray-100 group"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-7 ml-2 text-red-500 transition duration-75 group-hover:text-red-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                >
                  <path d="M0,0h24v24H0V0z" 
                  fill="none"/>
                  <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/>
              </svg>
              <span className="ml-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <div className=" text-xs p-5 text-gray-800">
        &copy;2024 Real Estate Management System
      </div>
      <LogoutModal
        open={openLogoutModal}
        handleClose={handleCloseLogoutModal}
      />
    </aside>
  );
};

export default AdminAside;
