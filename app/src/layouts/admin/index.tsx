import React, { FC } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';

const Layout:FC<any> = ({children}) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
