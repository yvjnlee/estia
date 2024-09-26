import React from "react";
import { LocomotiveScrollBar } from "../components/LocomotiveScrollBar";
import { useAuth } from "../context";
import "../index.css";

import { Navbar } from "../components/navbar/Navbar";
import HomePage from "./HomePage";
import { LoginPage } from "./LoginPage";

import MainEstiaLogo from "../img/MainAppLogo.svg";

export const LandingPage: React.FC = () => {
  const { session, showAuth, logIn } = useAuth();

  return (
    <>
      {session && <Navbar />} {/* Render Navbar if there is a session */}

      {/* Home Page + Routes */}
      {session ? (
        <HomePage />
      ) : showAuth ? (
        <LoginPage />
      ) : (
        <div className="initial-container">
          <img className="initial-logo" src={MainEstiaLogo} alt="Main Logo" />
          <h3 className="initial-slogan">Less Searching, More Creating</h3>
          <button className="initial-button" onClick={logIn}>
            Start Building
          </button>
          <LocomotiveScrollBar />
          <h3 className="initial-feedback">
            Got ideas or feedback?{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://forms.gle/RCfJKZtoGXo1Dq9DA"
            >
              Contact us!
            </a>
          </h3>
        </div>
      )}
    </>
  );
};
