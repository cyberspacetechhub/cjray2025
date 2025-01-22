import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminAside from "./AdminAside";

const AdminLayout = () => {
  
    const [aside, setAside] = useState(false);

    // console.log(aside);

  return (
    <>
      <div className="antialiased bg-gray-100 dark:bg-gray-900 h-dvh min-h-max relative">
       
       <AdminHeader setAside={setAside} />

        {/* <!-- Sidebar --> */}

        <AdminAside aside={aside} setAside={setAside} />

        <main className="p-4 md:ml-48 min-h-max pt-7">

            <Outlet />
         
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
