import React, { useEffect, useState } from "react";
import { LocomotiveScrollBar } from "../components/LocomotiveScrollBar";

import "../index.css";

import { Navbar } from "../components/navbar/Navbar";
import HomePage from "./HomePage";
import { LoginPage } from "./LoginPage";

import { Session } from "@supabase/supabase-js";
import { getSession } from "../api/authAPI";
import { Link } from "react-router-dom";

import { InitialNavbar } from "../components/navbar/InitialNavbar";
import { FeatureList } from "../components/landingpage/FeatureList";

import PrototypeImage from "../img/prototype.svg";
import { FadeInSection } from "../components/FadeInSection";

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
                <div>
                    <InitialNavbar />
                    <div className="wrapper">
                        <div className="initial-container">
                            <div className="initial-heading-container">
                            <h3 className="initial-slogan">
                                The world's largest
                                <span className="highlight"> collection </span>
                                of coding projects.
                            </h3>
                            <h2 className="initial-secondary-slogan"> 
                                Whether you're a seasoned coder or just starting out, 
                                our knowledge bank is here to transform your coding journey.
                                </h2>
                            <button className="initial-button" onClick={handleShowLogin}>
                                Start Building
                            </button>
                            </div>
                            <img className="starting-image" src={PrototypeImage}/>
                            <FadeInSection>
                            <h2 className="landing-subheading">Any Skill You Can Imagine</h2>
                            <LocomotiveScrollBar />
                            </FadeInSection>
                            <FadeInSection>
                                <FeatureList/>
                            </FadeInSection>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
