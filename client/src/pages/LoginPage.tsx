/* eslint-disable camelcase */
import React from "react";
// import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../common/clients";

export const LoginPage: React.FC = () => {
    const logOut = () => {
        supabase?.auth.signOut();
    };

    return (
        <div className="login-container">
            <div className="back-container">
                <button className="login-back-button" onClick={logOut}>
                    Go back
                </button>
            </div>
            <div className="registration-container">
                <h2 className="login-title">Let's get started</h2>

                <button className="login-button" onClick={() => supabase.auth.signInWithOAuth({
                        provider: 'google',
                    })
                }>
                    Sign in with Google
                </button>

                <button className="login-button" onClick={() => supabase.auth.signInWithOAuth({
                        provider: 'github',
                    })
                }>
                    Sign in with GitHub
                </button>

                

            </div>
        </div>
    );
};
