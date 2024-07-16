import { Navigate, Outlet } from "react-router-dom";

import React from 'react'
import { isLoggedIn } from "../api/auth/LoginUtil";

export const Layout = () => {
  return (
    isLoggedIn() ? 
        <Outlet /> : <Navigate to={"/login"}/>
  )
}
