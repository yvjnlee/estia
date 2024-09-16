import "./index.css";
import React from "react";
import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

const supabase = createClient(
  process.env.REACT_APP_PROJECT_URL as string,
  process.env.REACT_APP_ANON_KEY as string
);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as Session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as Session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="login-container">
        <h2 className="login-title">Create an account</h2>
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
            message:"custom_message",
          },
          style: {
            // Add any inline styles if needed, otherwise, the CSS classes will handle the styles.
          },
        }}
        localization={{
          variables: {
            sign_in: {
              email_label: '',
              password_label: '',
              email_input_placeholder: "Email",
              password_input_placeholder: "Password",
            },
            sign_up: {
              email_label: '',
              password_label: '',
              password_input_placeholder: "Password",
            },
          },
        }}
      />
            </div>

    );
  } else {
    return (
      <>
        <div>Logged in!</div>
        <button
          className="custom-button"
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          Log Out
        </button>
      </>
    );
  }
}
