import React from 'react'

import { NavLink, Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
    <header>
    <NavLink to="/registration">HOME</NavLink >
    <NavLink to='login'>LOGIN</NavLink>
    </header>  
    <main className="container">
           <Outlet />
       </main>


   </>

  )
}

