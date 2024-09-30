// Purpose is to make sure the Nav Bar is always at the top this is why 
// I put it in the nav bar folder lol

import React from 'react';
import { Navbar } from './Navbar';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main> 
        </div>
    );
};

export default AppLayout;