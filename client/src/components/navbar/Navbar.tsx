import React from "react";
import { LogOutButton } from "../buttons/LogOutButton";

export const Navbar: React.FC = () => {
    return(
        <div className="nav-bar" data-scroll-section>
            <h1 className="logo">estia</h1>

            <LogOutButton />
        </div>
    );
}