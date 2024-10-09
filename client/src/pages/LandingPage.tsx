import React from "react";
import { LocomotiveScrollBar } from "../components/LocomotiveScrollBar";
import { useAuth } from "../context";
import "../index.css";

import { Navbar } from "../components/navbar/Navbar";
import HomePage from "./HomePage";
import { LoginPage } from "./LoginPage";

import MainEstiaLogo from "../img/MainAppLogo.svg";
import { Link } from "react-router-dom";

export const LandingPage: React.FC = () => {
    const { session, showAuth, logIn, setShowAuth } = useAuth(); // Added setShowAuth to control showAuth state

    // Ensure showAuth is false once the user is logged in
    React.useEffect(() => {
        if (session) {
            setShowAuth(false); // Hide login page if session is active
        }
    }, [session, setShowAuth]);

    return (
        <>
            {/* Render Navbar if there is a session */}
            {session && <Navbar />}

            {/* Home page, rendered only if there is a session */}
            {session && <HomePage />}

            {/* Login page, rendered only if there is no session and showAuth is true */}
            {!session && showAuth && <LoginPage />}

            {/* Initial landing page when not logged in */}
            {!session && !showAuth && (
                 <div className="wrapper">
                <div className="initial-container">
                    <img className="initial-logo" src={MainEstiaLogo} alt="Estia Logo" />
                    <h3 className="initial-slogan">Less Searching, More Creating</h3>
                    <button className="initial-button" onClick={logIn}>
                        start building
                    </button>
                    <LocomotiveScrollBar />
                    <h3 className="initial-feedback">
                        Got ideas or feedback?{" "}
                        <Link target="_blank" to="https://forms.gle/RCfJKZtoGXo1Dq9DA">
                            Contact us!
                        </Link>
                    </h3>
                </div>
                </div>
            )}
        </>
    );
};
