import React, { useState } from 'react'
import AddProductModal from './AddProductModal';
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import baseUrl from '../../../shared/baseUrl';
import { useQuery } from 'react-query';

const AdminProducts = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {auth} = useAuth();
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
    <div className=' mt-20 px-40'>
      <button onClick={() => {handleOpen()}}>Add Product</button>
      <h1>Admin Products</h1>

      <div>
        <AddProductModal
          open={open}
          handleClose={handleClose}
        />
      </div>
    </div>
  )
}

export default AdminProducts
