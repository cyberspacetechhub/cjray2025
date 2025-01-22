import React, { useState } from 'react'
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";
import AddProductModal from '../product/AddProductModal';
import useFetch from '../../../hooks/useFetch';
import baseUrl from '../../../shared/baseUrl';
import { useQuery } from 'react-query';
import {Link} from 'react-router-dom'
import Stats from './Stats';

const AdminOverview = () => {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const fetch = useFetch();
  const url = `${baseUrl}product`

  const getproducts = async () => {
    const result = await fetch(url, auth.accessToken);

    return result.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["products"],
    getproducts,
    { keepPreviousData: true, 
        staleTime: 10000,
        refetchOnMount:"always" }
  );

  console.log(data)
  return (
    <div className='px-4 mt-20 h-auto'>
      <div className=''>
       <div className=" text-emerald-600 flex justify-between items-center mb-0 bg-gray-400 rounded-md p-2">
        {auth ? (
          <div className="">
          <div className="">
            <h2 className=" text-2xl mb-0">Welcome,  {auth?.user?.username}!</h2>
            <span>{auth?.user?.type}</span>
          </div> 
        </div>
      ) : (
        <h2>Loading user information...</h2> // In case the user data is still being fetched
      )}
        </div>
        
        <Stats />
        <div className='mt-5'>
          <button onClick={() => {handleOpen()}}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
            >Add Product</button>
        </div>
        <div className="overflow-x-auto shadow-md rounded-md mt-4 py-5 border border-dashed border-gray-300">
          <h1 className='font-bold px-2 pb-2 border-b'>Products</h1>
        <table className="w-full min-w-max overflow-x-auto table-auto rounded-md">
          <thead className='bg-gray-100 dark:bg-gray-900'>
            <tr className=" text-white">
              <th className="sticky left-0 bg-gray-100 dark:bg-gray-900 p-2 text-left z-10 text-gray-700">Name</th>
              <th className=" p-2 text-left z-10 text-gray-700">Category</th>
              <th className="p-2 text-left text-gray-700">Quantity</th>
              <th className="p-2 text-left text-gray-700">Purchase Price</th>
              <th className="p-2 text-left text-gray-700">Selling Price</th>
              <th className="p-2 text-left text-gray-700">Status</th>
              <th className="p-2 text-left text-gray-700">Product No.</th>
              <th className="p-2 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-900 dark:text-gray-300'>
            {data?.products?.map((product) => (
              <tr key={product.position} className="hover:bg-gray-200 dark:hover:bg-gray-600">
                <td className="sticky bg-gray-100 dark:bg-gray-900 left-0 p-2 z-20">{product.name}</td>
                <td className=" p-2 z-10">{product.category}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">&#8358;{parseFloat(product.purchasePrice.$numberDecimal).toLocaleString('en-US')}</td>
                <td className="p-2">&#8358;{parseFloat(product.price.$numberDecimal).toLocaleString('en-US')}</td>
                <td className="p-2">{product.status}</td>
                <td className="p-2">{product.productNo}</td>
                <td className="p-2">
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
       </div>

      <div>
        <AddProductModal
          open={open}
          handleClose={handleClose}
        />
      </div>
    </div>
  )
}

export default AdminOverview
