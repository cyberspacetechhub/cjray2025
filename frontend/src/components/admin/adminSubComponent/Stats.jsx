import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import useFetch from "../../../hooks/useFetch";
import baseUrl from "../../../shared/baseURL";

// Reusable Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="bg-gray-300 dark:bg-gray-800 flex justify-between items-center p-2 rounded-md shadow-md">
    <span>{icon}</span>
    <div className="flex flex-col items-start gap-1">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-semibold text-gray-700 dark:text-gray-300">{value}</span>
    </div>
  </div>
);

// Reusable Bar Component
const Bar = ({ height, label }) => (
  <div>
    <span className="block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300">
      <span
        className="block w-3.5 rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600"
        style={{ height: `${height}%` }}
      ></span>
    </span>
    <span className="flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1">
      {label.split("").map((char, idx) => (
        <span key={idx}>{char}</span>
      ))}
    </span>
  </div>
);

const Stats = () => {
  const { auth } = useContext(AuthContext);
  const fetch = useFetch();
  const url = `${baseUrl}product`;

  // Fetch products
  const getProducts = async () => {
    const result = await fetch(url, auth.accessToken);
    return result.data;
  };

  const { data, isError, isLoading } = useQuery(["products"], getProducts, {
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  const products = data?.products || [];
  // Calculate monthly data
  const calculateMonthlyData = (products) => {
    if (!Array.isArray(products)) {
      console.warn("Products data is not an array:", products);
      return [];
    }
  
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString("default", { month: "short" })
    );
  
    const grouped = products.reduce((acc, product) => {
      const date = new Date(product.createdAt);
      const month = months[date.getMonth()];
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
  
    const total = products.length;
  
    // Log the grouped data and percentages for debugging
    return months.map((month) => {
      const count = grouped[month] || 0;
      const percentage = (count / total) * 100;
  
      // Log the data for debugging
      console.log(`Month: ${month}, Count: ${count}, Total: ${total}, Percentage: ${percentage}%`);
  
      return {
        label: month,
        percentage,
      };
    });
  };
  
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  const monthlyData = calculateMonthlyData(products);

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
        <StatCard
          icon={
                <svg 
                xmlns="http://www.w3.org/2000/svg"
                  className='w-8 h-8 text-blue-700'
                // height="24px" 
                  viewBox="0 -960 960 960" 
                // width="24px" 
                  fill="currentColor"
                >
                <path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z"/>
                </svg>
          }
          label="Total Products"
          value={products.length.toString().padStart(2,'0')}
        />
        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" 
            className='w-8 h-8 text-blue-700'
            //  height="24px" 
             viewBox="0 -960 960 960" 
            //  width="24px" 
             fill="currentColor"
              >
              <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/>
            </svg>
          }
          label="Product Sum"
          value="Value"
        />
        <StatCard
          icon={
            <svg 
            xmlns="http://www.w3.org/2000/svg"
            className='w-8 h-8 text-blue-700'
            viewBox="0 -960 960 960" 
            fill="currentColor"
            >
            <path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
          </svg>
          }
          label="Total Sales"
          value="Value"
        />
        <StatCard
          icon={
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className='w-8 h-8 text-blue-700'
          //  height="24px" 
            viewBox="0 -960 960 960" 
          //  width="24px" 
            fill="currentColor"
            >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-640h80v640h640v80H200Zm40-120v-360h160v360H240Zm200 0v-560h160v560H440Zm200 0v-200h160v200H640Z"/>
            </svg>
          }
          label="Total Profits"
          value="Value"
        />
        <StatCard
          icon={
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className='w-8 h-8 text-blue-700' 
            //  height="24px" 
              viewBox="0 -960 960 960" 
            //  width="24px" 
              fill="currentColor"
              >
              <path d="M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z"
              />
            </svg>
          }
          label="Product on Sale"
          value="Value"
        />
      </div>

      {/* Bar Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        <div className="flex justify-center gap-3 bg-blue-300 p-4 rounded-md shadow-md">
          {monthlyData.map(({ label, percentage }) => (
            <Bar key={label} height={percentage} label={label} />
          ))}
        </div>
        <div className="flex justify-center gap-3 bg-blue-300 p-4 rounded-md shadow-md">
          {monthlyData.map(({ label, percentage }) => (
            <Bar key={label} height={percentage} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
