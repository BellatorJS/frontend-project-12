import React from 'react';

import { NavLink, Outlet } from 'react-router-dom';
import { Navbar1 } from './Navbar';

export const Layout = () => (
  <>
    <header>
      <Navbar1 />
    </header>
    <main className="container">
      <Outlet />
    </main>

  </>

);
