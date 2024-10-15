import React from "react";
import EstiaLogo from "../../img/AppLogo.svg";

import { LogInButton } from "../buttons/LoginButton";
import { Link } from "react-router-dom";

import { FeedbackButton } from "../buttons/FeedbackButton";
import { GithubButton } from "../buttons/GithubButton";

export const InitialNavbar: React.FC = () => {
    return (
        <nav className="nav-bar" data-scroll-section>
            <Link to="/">
                <img className="logo" src={EstiaLogo}></img>
            </Link>
            <div className="nav-buttons-continer">
                <FeedbackButton/>
                <GithubButton/>
            </div>
            <LogInButton />
        </nav>
    );
};
