import React, { useState, useEffect, useRef } from "react";
import EstiaLogo from "../../img/AppLogo.svg";

import { LogInButton } from "../buttons/LoginButton";
import { Link } from "react-router-dom";

import { FeedbackButton } from "../buttons/FeedbackButton";
import { GithubButton } from "../buttons/GithubButton";

export const InitialNavbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null); // Reference for the mobile menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false); // Close the menu if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
            <div ref={menuRef} className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
                <FeedbackButton />
                <GithubButton />
                <LogInButton />
            </div>
        </nav>
    );
};
