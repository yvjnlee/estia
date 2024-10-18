import React, { useState, useEffect, useRef } from "react";
import EstiaLogo from "../../img/AppLogo.svg";
import EstiaLogoforLight from "../../img/AppLogoLight.svg";
import { LogOutButton } from "../buttons/LogOutButton";
import { Link } from "react-router-dom";
import { CreateProjectButton } from "../buttons/CreateProjectButton";
import { LearnPreferencesButton } from "../buttons/LearnPreferencesButton";
import { ProfileButton } from "../buttons/ProfileButton";

import LightIcon from "../../img/LightMode.png";
import DarkIcon from "../../img/DarkMode.png";

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState("default");
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "default";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "default" ? "inverted" : "default";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
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
                <img
                    className="logo"
                    src={theme === "default" ? EstiaLogo : EstiaLogoforLight} // Switch the logo based on the theme
                    alt="Estia Logo"
                />
            </Link>
            <div className="nav-buttons-container">
                <div className="nav-link-buttons">
                    <CreateProjectButton />
                    <LearnPreferencesButton />
                    <ProfileButton />
                </div>
                <div className="nav-end-links">
                <button onClick={toggleTheme} className="theme-toggle-button">
                <img
                        className="theme-logo"
                        src={theme === "default" ? DarkIcon : LightIcon} // Switch the logo based on the theme
                    />
                </button>
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
            <div ref={menuRef} className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
                <CreateProjectButton />
                <LearnPreferencesButton />
                <ProfileButton />
                <LogOutButton />
            </div>
        </nav>
    );
};
