import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <>
    <header>
      <Navbar />
    </header>
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
