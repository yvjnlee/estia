import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { useAuth } from "../context";

export const LoginPage: React.FC = () => {
  const { supabase, logOut } = useAuth();

  return (
    <div className="login-container">
      <div className="back-container">
        <button className="login-back-button" onClick={logOut}>
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
};
