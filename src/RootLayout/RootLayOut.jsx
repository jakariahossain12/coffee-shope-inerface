import React from 'react';
import Header from '../components/header/Header';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const RootLayOut = () => {
    return (
      <div>
        <Header></Header>
        <div>
          <Outlet></Outlet>
        </div>
        <ToastContainer />
      </div>
    );
};

export default RootLayOut;