import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './bars/Header';
import Sidebar from './bars/Sidebar/index';
import Scrollbars from 'react-custom-scrollbars';
const MainLayout = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  return (
    <Scrollbars autoHide className='min-h-screen'>
      <div className='flex h-full'>
        <Sidebar open={open} changeOpen={setOpen} />
        <div className='w-full ml-[0px] md:ml-[60px] lg:ml-[215px]'>
          <Header changeOpen={setOpen} />
          <Outlet />
        </div>
      </div>
    </Scrollbars>
  );
};

export default MainLayout;
