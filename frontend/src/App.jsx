import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import PersistLogin from './shared/persistLogin'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import AdminLayout from './components/admin/adminSubComponent/AdminLayout'
import RequireAuthAdmin from './components/auth/RequireAuthAdmin'
import Layout from './components/home/Layout';
import AdminProducts from './components/admin/product/AdminProducts';
import AdminOverview from './components/admin/adminSubComponent/AdminOverview';
import ProductDetails from './components/home/pages/productDetails';
import Checkout from './components/home/pages/Checkout';
import Cart from './components/home/pages/Cart';

function App() {
  const queryClient = new QueryClient();
  const roles = { customer: "Customer", admin: "Admin", manager: "productManager" , owner: "Owner"};
  
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route 
              path='/' 
              element={<Layout/>}>
                <Route 
                  index 
                  element={<Home />} 
                />
                <Route
                  path='/cart'
                  element={<Cart />}
                />
                <Route
                  path='/checkout'
                  element={<Checkout />}
                />
                <Route
                  path='/productdetails/:id'
                  element={<ProductDetails />}
                />
            </Route>
          </Route>
            {/* public route for admin */}
            <Route path='/auth/login' element={<Login />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuthAdmin allowedRoles={[roles.admin]} />}>
                <Route
                  path='/admin'
                  element={<AdminLayout/>} >
                    <Route
                      index element={<AdminOverview />} />
                </Route>
              </Route>
            </Route>
        </Routes>
      </>
    </QueryClientProvider>
  )
}

export default App
