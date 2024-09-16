import "./index.css";
import "./login.css";
import "./firstpage.css";
import React, { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

const supabase = createClient(
  process.env.REACT_APP_PROJECT_URL as string,
  process.env.REACT_APP_ANON_KEY as string
);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [showAuth, setShowAuth] = useState(false); // State to control the display of Auth component

  useEffect(() => {
    // Supabase session handling
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as Session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as Session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Add the scroller animation effect
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    // If a user hasn't opted in for reduced motion, add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller`
        scroller.setAttribute("data-animated", "true");

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        
        // Ensure scrollerInner is not null
        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children);

          // For each item in the array, clone it and append it
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as Element;
            duplicatedItem.setAttribute("aria-hidden", "true");
            scrollerInner.appendChild(duplicatedItem);
          });
        }
      });
    }
  }, []); // Runs once after the component mounts

  // Handle session state
  if (session) {
    return (
      <>
        <div>Logged in!</div>
        <button
          className="custom-button"
          onClick={async () => {
            await supabase.auth.signOut();
            setSession(null); // Reset session state
          }}
        >
          Log Out
        </button>
      </>
    );
  }

  // Display Auth component if "Get Started" is clicked
  if (showAuth) {
    return (
      <div className="login-container">
        <h2 className="login-title">Welcome to estia</h2>
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
  }

  // Initial page with the scroller
  return (
    <div className="initial-container">
      <h2 className="initial-title">estia</h2>
      <h3 className="initial-slogan">Less Searching, More Creating</h3>
      <button
        className="initial-button"
        onClick={() => setShowAuth(true)} // Show the Auth component when button is clicked
      >
        Get Started
      </button>

      <div className="scroller" data-speed="slow">
        <ul className="tag-list scroller__inner">
          <li>Backend Programming</li>
          <li>Angular</li>
          <li>Typscript</li>
          <li>Databases</li>
          <li>Integration Testing</li>
          <li>Animation</li>
          <li>Blockchain</li>
          <li>UI/UX</li>
        </ul>
      </div>
    </div>
  );
}
