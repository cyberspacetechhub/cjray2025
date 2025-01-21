import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuthAdmin = ({allowedRoles}) => {
  const {auth} = useAuth()
  console.log(auth)
  const location = useLocation()
  return ( 
      
    allowedRoles.some((role) => auth?.roles === role)
      ? <Outlet />
      : auth?.user ?
      <Navigate to="/unauthorized" state={{from: location}} replace />
        : <Navigate to="/auth/login" state={{from: location}} replace />

  );
}

export default RequireAuthAdmin
