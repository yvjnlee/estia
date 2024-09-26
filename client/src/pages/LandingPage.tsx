import React from "react";
import { LocomotiveScrollBar } from "../components/LocomotiveScrollBar";
import { useAuth } from "../context";
import "../index.css";

import { Navbar } from "../components/navbar/Navbar";
import HomePage from "./HomePage";
import { LoginPage } from "./LoginPage";

import MainEstiaLogo from "../img/MainAppLogo.svg"

export const LandingPage: React.FC = () => {
  const { session, showAuth, logIn } = useAuth();

  // Home Page + Routes
  if (session) {
    return (
      <>
        <Navbar />
        <HomePage />
      </>
    );
  }

  // Login page
  if (showAuth) {
    return (
      <>
        <LoginPage />
      </>
    );
  }

  //   Landing page
  return (
    <div className="initial-container">
      <img className="initial-logo" src={MainEstiaLogo}></img>
      <h3 className="initial-slogan">Less Searching, More Creating</h3>
      <button className="initial-button" onClick={logIn}>
        Get Started
      </button>
      <LocomotiveScrollBar />
    </div>
  );
};
