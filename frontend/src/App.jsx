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
import ProductDetails from './components/home/pages/ProductDetails';
import Checkout from './components/home/pages/Checkout';
import Cart from './components/home/pages/Cart';
import SmartLocks from './components/home/pages/SmartLocks';
import PopularProduct from './components/home/pages/PopularProduct';
import RecentProduct from './components/home/pages/RecentProduct';
import TopPicks from './components/home/pages/TopPicks';
import Page404 from './components/views/Page404';
import UnAuthorized from './components/views/Unathorized';
import FireSafetyP from './components/home/pages/FireSafetyP';
import CreatorLight from './components/home/pages/CreatorLight';
import GadgElectronic from './components/home/pages/GadgElectronic';
import Lightings from './components/home/pages/Lightings';
import VerifyPage from './components/auth/VerifyPage';
import SignIn from './components/auth/SignIn';
import VerifyEmail from './components/auth/VerifyEmail';

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
                <Route
                  path='/smartlocks'
                  element={<SmartLocks />}
                />
                <Route
                  path='/popularproducts'
                  element={<PopularProduct />}
                />
                <Route
                  path='/recent_products'
                  element={<RecentProduct />}
                />
                <Route
                  path='/selfie_sticks_tripods'
                  element={<TopPicks />}
                />
                <Route
                  path='/fire_safety_protections'
                  element={<FireSafetyP />}
                />
                <Route
                  path='/creators_light'
                  element={<CreatorLight />}
                />
                <Route
                  path='/gadgets_electronics'
                  element={<GadgElectronic />}
                />
                <Route
                  path='/lightings'
                  element={<Lightings />}
                />
                <Route
                  path='/verify'
                  element={<VerifyPage />}
                />
                <Route
                  path='/verify_email'
                  element={<VerifyEmail />}
                />
            </Route>
          </Route>
            {/* public route for admin */}
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/signin' element={<SignIn />} />
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
            <Route
              path="*"
              element={<Page404 />}
            />
            <Route
              path="unauthorized"
              element={<UnAuthorized />}
            />
        </Routes>
      </>
    </QueryClientProvider>
  )
}

export default App
