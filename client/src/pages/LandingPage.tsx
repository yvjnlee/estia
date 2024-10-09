import React, { useEffect, useState } from "react";
import { LocomotiveScrollBar } from "../components/LocomotiveScrollBar";

import "../index.css";

import { Navbar } from "../components/navbar/Navbar";
import HomePage from "./HomePage";
import { LoginPage } from "./LoginPage";

import MainEstiaLogo from "../img/MainAppLogo.svg";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../common/clients";

export const LandingPage: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
    }, []);

    const handleShowLogin = () => {
        setShowLogin(true);
    };

    return (
        <>
            {/* Render Navbar if there is a session */}
            {session && <Navbar />}

            {/* Home page, rendered only if there is a session */}
            {session && <HomePage />}

            {/* Login page, rendered if there is no session and showLogin is true */}
            {!session && showLogin && <LoginPage />}

            {/* Initial landing page when not logged in and showLogin is false */}
            {!session && !showLogin && (
                <div className="initial-container">
                    <img className="initial-logo" src={MainEstiaLogo} alt="Estia Logo" />
                    <h3 className="initial-slogan">Less Searching, More Creating</h3>
                    <button className="initial-button" onClick={handleShowLogin}>
                        Start Building
                    </button>
                    <LocomotiveScrollBar />
                    <h3 className="inital-feedback">
                        Got ideas or feedback?{" "}
                        <Link target="_blank" to="https://forms.gle/RCfJKZtoGXo1Dq9DA">
                            Contact us!
                        </Link>
                    </h3>
                </div>
            )}
        </>
    );
};
