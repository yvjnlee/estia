import React, { useEffect, useState } from "react";
import { LocomotiveScrollBar } from "../components/LocomotiveScrollBar";

import "../index.css";

import HomePage from "./HomePage";

import MainEstiaLogo from "../img/MainAppLogo.svg"
import { Session } from "@supabase/supabase-js";
import { getSession } from "../api/authAPI";
import { Link } from "react-router-dom";

export const LandingPage: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);

    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
            setSessionLoading(false);
        });
    }, []);

    if (sessionLoading) {
        return <div className="loading-overlay"><div className="loading-spinner"></div></div>;
    }

    if (session && !sessionLoading) {
        return (
            <>
                <HomePage />
            </>
        );
    }

    return (
        <div className="landing-page-wrapper">
            <div className="wrapper">
                <div className="initial-container">
                    <img className="initial-logo" src={MainEstiaLogo} alt="Estia Logo" />
                    <h3 className="initial-slogan">Less Searching, More Creating</h3>
                    <Link to="/login" className="initial-button">
                        start building
                    </Link>
                    <LocomotiveScrollBar />
                    <h3 className="initial-feedback">
                        Got ideas or feedback?{" "}
                        <Link target="_blank" to="https://forms.gle/RCfJKZtoGXo1Dq9DA">
                            Contact us!
                        </Link>
                    </h3>
                </div>
            </div>
        </div>
    );
};
