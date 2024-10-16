import React, { useState } from "react";
import EstiaLogo from "../../img/AppLogo.png";

import { LogInButton } from "../buttons/LoginButton";
import { Link } from "react-router-dom";

import { FeedbackButton } from "../buttons/FeedbackButton";
import { GithubButton } from "../buttons/GithubButton";

export const InitialNavbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="nav-bar" data-scroll-section>
            <Link to="/">
                <img className="logo" src={EstiaLogo} alt="Estia Logo" />
            </Link>
            <div className="nav-buttons-container">
                <div className="nav-link-buttons">
                    <FeedbackButton />
                    <GithubButton />
                </div>
                <LogInButton />
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
                <FeedbackButton />
                <GithubButton />
                <LogInButton />
            </div>
        </nav>
    );
};
