import React, { useState } from "react";
import EstiaLogo from "../../img/AppLogo.png";

import { LogOutButton } from "../buttons/LogOutButton";
import { Link } from "react-router-dom";

import { CreateProjectButton } from "../buttons/CreateProjectButton";
import { LearnPreferencesButton } from "../buttons/LearnPreferencesButton";
import { ProfileButton } from "../buttons/ProfileButton";

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="nav-bar" data-scroll-section>
            <Link to="/">
                <img className="logo" src={EstiaLogo} alt="Estia Logo"></img>
            </Link>
            <div className="nav-buttons-container">
                <div className="nav-link-buttons">
                <CreateProjectButton />
                <LearnPreferencesButton />
                <ProfileButton />
                </div>
                <LogOutButton />
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
                <CreateProjectButton />
                <LearnPreferencesButton />
                <ProfileButton />
                <LogOutButton />
            </div>
        </nav>
    );
};
