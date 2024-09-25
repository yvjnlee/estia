import React from "react";
import {
  LocomotiveScrollBar,
  projects,
} from "../components/LocomotiveScrollBar";
import { Route, Routes } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { useAuth } from "../context";

import "../index.css";

import HomePage from "./HomePage";
import ProjectDetails from "../components/ProjectDetails";
import { LogOutButton } from "../components/buttons/LogOutButton";

export const LandingPage: React.FC = () => {
  const { supabase, session, showAuth, logIn, logOut } = useAuth();
  // Home page + Routes
  if (session) {
    return (
      <>
        <div>
          <div className="nav-bar" data-scroll-section>
            <h1 className="logo">estia</h1>

            <LogOutButton />
          </div>

          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {projects.map((project, index) => (
                <Route
                  key={index}
                  path={`/project/${project.title}`}
                  element={<ProjectDetails />}
                />
              ))}
            </Routes>
          </div>
        </div>
      </>
    );
  }

  // Login page
  if (showAuth) {
    return (
      <div className="login-container">
        <div className="back-container">
          <button className="back-button" onClick={ logOut }>
            Go back
          </button>
        </div>
        <div className="registration-container">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h2 className="login-title">Let's get started</h2>
          <Auth
            supabaseClient={supabase}
            appearance={{
              extend: false,
              className: {
                container: "custom-container",
                button: "custom-button",
                input: "custom-input",
                anchor: "custom-anchor",
                label: "custom-label",
                message: "custom_message",
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "",
                  password_label: "",
                  email_input_placeholder: "Email",
                  password_input_placeholder: "Password",
                },
                sign_up: {
                  email_label: "",
                  password_label: "",
                  password_input_placeholder: "Password",
                },
                forgotten_password: {
                  email_label: "",
                },
              },
            }}
          />
        </div>
      </div>
    );
  }

  //   Landing page
  return (
    <div className="initial-container">
      <h2 className="initial-title">estia</h2>
      <h3 className="initial-slogan">Less Searching, More Creating</h3>
      <button className="initial-button" onClick={ logIn }>
        Get Started
      </button>
      <LocomotiveScrollBar />
    </div>
  );
};
