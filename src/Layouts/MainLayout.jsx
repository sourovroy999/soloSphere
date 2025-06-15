import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <div className='min-h-[calc(100vh-270px)]'>

            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;