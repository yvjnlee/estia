import React, { useEffect, useState } from "react";
import { LocomotiveScrollBar } from "../components/LocomotiveScrollBar";

import "../index.css";

import HomePage from "./HomePage";

import { Session } from "@supabase/supabase-js";
import { getSession } from "../api/authAPI";
import { Link } from "react-router-dom";

import { InitialNavbar } from "../components/navbar/InitialNavbar";
import { FeatureList } from "../components/landingpage/FeatureList";

import PrototypeImage from "../img/prototype.svg";
import { FadeInSection } from "../components/FadeInSection";

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
                            <Link to="/login">
                                <button className="initial-button">
                                    Start Building
                                </button>
                            </Link>
                        </div>
                        <img className="starting-image" src={PrototypeImage} />
                        <FadeInSection>
                            <h2 className="landing-subheading">
                                Develop Any Skill You Can Imagine
                            </h2>
                            <LocomotiveScrollBar />
                        </FadeInSection>
                        <FadeInSection>
                            <FeatureList />
                        </FadeInSection>
                        <FadeInSection>
                            <div className="contribution-container">
                        <h2 className="landing-subheading">
                                Interested in Contributing?
                            </h2>
                            <h2 className="contribution-header">
                            Estia was created by a group of passionate Waterloo students 
                            who believe the best way to learn is by building something meaningful.
                                If you're excited about 
                                this project, <a className="contact-tag" href="https://github.com/yvjnlee/estia?tab=readme-ov-file#contact" target="_blank">contact us</a> to 
                                get involved.
                            </h2>
                            <button className="star-button"     
                            onClick={() => window.open('https://github.com/yvjnlee/estia', 
                                '_blank')}
                            >
                            ⭐ Give our Repo a Star
                            </button>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </div>
        </div>
    );
};
