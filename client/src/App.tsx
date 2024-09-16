import "./index.css";

import React, { useState, useEffect, useRef } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

import Project from "./components/project";

import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

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
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    // Ensure the scrollRef exists
    if (scrollElement) {
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollElement, // Ensure this is the ref pointing to the parent container
        smooth: true,
        getDirection: true, // This can be useful if you're checking scrolling direction
      });

      // Cleanup on unmount
      return () => {
        locomotiveScroll.destroy();
      };
    }
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
  }, [showAuth]); // Runs once after the component mounts

  // Handle session state
  if (session) {
    return (
      <>
        <button
          className="custom-button"
          onClick={async () => {
            await supabase.auth.signOut();
            setSession(null); // Reset session state
          }}
        >
          Log Out
        </button>
        <div ref={scrollRef} className="main-container" >
        <div className="heading-container">
          <h2 className="main-h2" data-scroll-section>
            start building today
          </h2>
          </div>
          <div className="projects-container">
            <div className="project-row" data-scroll-section>
              <Project title="Syllabus Extractor" tech1="React" tech2="TypeScript" colour="#6F0000" />
              <Project title="Netflix Clone" tech1="React" tech2="TypeScript" colour="#456F00" />
              <Project title="Spanish Writing Assistant" tech1="React" tech2="TypeScript" colour="#006F5B" />
              <Project title="Football Webscraper" tech1="React" tech2="TypeScript" colour="#6F0050" />
            </div>
            <div className="project-row" data-scroll-section>
              <Project title="Actorle" tech1="React" tech2="TypeScript" colour="#45006F" />
              <Project title="Syllabus Extractor" tech1="React" tech2="TypeScript" colour="#6F0000" />
              <Project title="Netflix Clone" tech1="React" tech2="TypeScript" colour="#456F00" />
              <Project title="Football Webscraper" tech1="React" tech2="TypeScript" colour="#6F0050" />
            </div>
            <div className="project-row" data-scroll-section>
            <Project title="Spanish Writing Assistant" tech1="React" tech2="TypeScript" colour="#006F5B" />
            <Project title="Football Webscraper" tech1="React" tech2="TypeScript" colour="#6F0050" />
              <Project title="Syllabus Extractor" tech1="React" tech2="TypeScript" colour="#6F0000" />
              <Project title="Spanish Writing Assistant" tech1="React" tech2="TypeScript" colour="#006F5B" />
            </div>
            <div className="project-row" data-scroll-section>
              <Project title="Actorle" tech1="React" tech2="TypeScript" colour="#45006F" />
              <Project title="Football Webscraper" tech1="React" tech2="TypeScript" colour="#6F0050" />
              <Project title="Netflix Clone" tech1="React" tech2="TypeScript" colour="#456F00" />
              <Project title="Syllabus Extractor" tech1="React" tech2="TypeScript" colour="#6F0000" />
            </div>
            {/* Add more rows in the same structure */}
          </div>
        </div>
      </>
    );
  }

  // Display Auth component if "Get Started" is clicked
  if (showAuth) {
    return (
      <div className="login-container">
        <div className="back-container">
          <button
            className="back-button" // Add styling for the back button
            onClick={() => setShowAuth(false)} // Hide the Auth component and go back to the initial page
          >
            Go back
          </button>
        </div>
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
              forgotten_password: {
                email_label: "",
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
