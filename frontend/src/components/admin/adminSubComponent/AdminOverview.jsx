import React, { useState } from 'react'
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";
import AddProductModal from '../product/AddProductModal';
import useFetch from '../../../hooks/useFetch';
import baseUrl from '../../../shared/baseURL';
import { useQuery } from 'react-query';
import {Link} from 'react-router-dom'
import Stats from './Stats';
import DeleteQuery from '../../actions/DeleteQuery';
import UpdateProduct from '../product/UpdateProduct';
 
const AdminOverview = () => {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openDel, setOpenDel] = useState(false)
  const handleOpenDel = () => setOpenDel(true)
  const handleCloseDel = () => setOpenDel(false)

  const [openUpdate, setOpenUpdate] = useState(false)
  const handleOpenUpdate = () => setOpenUpdate(true)
  const handleCloseUpdate = () => setOpenUpdate(false)

  const [productId, setProductId] = useState(false)

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

  // console.log(auth)
  return (
    <div className='px-4 mt-20 h-auto'>
      <div className=''>
       <div className=" text-gray-800 dark:text-gray-300 flex justify-between items-center mb-0 bg-gray-400 dark:bg-gray-800 rounded-md p-2">
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
        <div className='shadow-md rounded-md mt-4 py-5 border border-dashed border-gray-300 dark:border-gray-800'>
          <h1 className='font-bold px-2 pb-2 border-b border-gray-200 text-gray-700 dark:text-gray-300 dark:border-gray-800'>Products</h1>
        <div className="overflow-x-auto bg-gray-100 dark:bg-gray-900">
        <table className="w-full min-w-max overflow-x-auto table-auto rounded-md">
          <thead className='bg-gray-100 dark:bg-gray-900'>
            <tr className=" text-white">
              <th className="sticky left-0 bg-gray-100 dark:bg-gray-900 p-2 text-left z-10 text-gray-700 dark:text-gray-400">Name</th>
              <th className=" p-2 text-left z-10 text-gray-700 dark:text-gray-400">Category</th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-400">Quantity</th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-400">Purchase Price</th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-400">Selling Price</th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-400">Status</th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-400">Product No.</th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-800 dark:bg-gray-900 dark:text-gray-300'>
            {data?.products?.map((product) => (
              <tr key={product.position} className="hover:bg-gray-200 dark:hover:bg-gray-600">
                <td className="sticky bg-gray-100 dark:bg-gray-900 left-0 p-2 z-20">{product.name}</td>
                <td className=" p-2 z-10">{product.category}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">&#8358;{product.purchasePrice.toLocaleString('en-US')}</td>
                <td className="p-2">&#8358;{product.price.toLocaleString('en-US')}</td>
                <td className="p-2">{product.status}</td>
                <td className="p-2">{product.productNo}</td>
                <td className="p-2 flex items-center gap-4">
                  <button onClick={() => {handleOpenUpdate(); setProductId(product)}} className='py-1 px-4 bg-blue-600 text-white rounded'>Edit</button>
                  <button onClick={() => {handleOpenDel(); setProductId(product._id)}} className='py-1 px-4 bg-red-600 text-white rounded'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
       </div>

      <div>
        <AddProductModal
          open={open}
          handleClose={handleClose}
        />
        <DeleteQuery
          open={openDel}
          handleClose={handleCloseDel}
          itemId={productId}
          url={url}
        />
        <UpdateProduct
          open={openUpdate}
          handleClose={handleCloseUpdate}
          product={productId}
        />
      </div>
    </div>
  )
}

export default AdminOverview
