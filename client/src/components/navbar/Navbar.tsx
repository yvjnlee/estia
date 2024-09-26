import React from "react";
import { LogOutButton } from "../buttons/LogOutButton";

import EstiaLogo from "../../img/AppLogo.svg"

export const Navbar: React.FC = () => {
    return(
        <div className="nav-bar" data-scroll-section>
            <img className='logo' src={ EstiaLogo }></img>

            <LogOutButton />
        </div>
    );
}