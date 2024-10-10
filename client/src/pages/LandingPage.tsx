import React, { useEffect, useState } from "react";
import { LocomotiveScrollBar } from "../components/LocomotiveScrollBar";

import "../index.css";

import { Navbar } from "../components/navbar/Navbar";
import HomePage from "./HomePage";
import { LoginPage } from "./LoginPage";

import MainEstiaLogo from "../img/MainAppLogo.svg";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { getSession } from "../api/authAPI";

export const LandingPage: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [showAuth, setShowAuth] = useState<boolean>(false);

    const handleShowLogin = () => {
        setShowAuth(true);
    };

    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
        });
    }, []);

    console.log(session, showAuth);

    // Render different views based on session state
    if (session && !showAuth) {
        return (
            <>
                <Navbar />
                <HomePage />
            </>
        );
    }

    return (
        <div className="landing-page-wrapper">
            {showAuth ? (
                <LoginPage />
            ) : (
                <div className="initial-container">
                    <img className="initial-logo" src={MainEstiaLogo} alt="Estia Logo" />
                    <h3 className="initial-slogan">Less Searching, More Creating</h3>
                    <button className="initial-button" onClick={handleShowLogin}>
                        Start Building
                    </button>
                    <LocomotiveScrollBar />
                    <h3 className="initial-feedback">
                        Got ideas or feedback?{" "}
                        <Link target="_blank" to="https://forms.gle/RCfJKZtoGXo1Dq9DA">
                            Contact us!
                        </Link>
                    </h3>
                </div>
            )}
        </div>
    );
};
