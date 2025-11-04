import React from 'react';
import Dashboard from './SubComponent/Dashboard';
import Enrolled from './SubComponent/Enrolled';
 import StatusCard from './SubComponent/StatusCard';
 import Finance from './SubComponent/Finance'; 

const MainDash = () => {
    return (
        <div className="w-full space-y-4 sm:space-y-6">
           <Dashboard />
           <StatusCard />
           <Enrolled />  
           <Finance />
        </div>
    );
};

export default MainDash;