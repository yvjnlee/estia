import React from "react";

import { LogOutButton } from "../buttons/LogOutButton";
import { CreateProjectButton } from "../buttons/CreateProjectButton";

import EstiaLogo from "../../img/AppLogo.svg"

export const Navbar: React.FC = () => {
    return(
        <div className="nav-bar" data-scroll-section>
            <img className='logo' src={ EstiaLogo }></img>
            <CreateProjectButton/>
            <LogOutButton />
        </div>
    );
}