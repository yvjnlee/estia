import React, { useRef, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectDetails from './components/ProjectDetails';
import { Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import './index.css';

import supabase from './SupabaseClient';

import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Define projects array with unique titles
const projects = [
  { title: "Twitter Sentiment Analysis", tech1: "Tensorflow", tech2: "Python", colour: "#6F0000" },
  { title: "Netflix Clone", tech1: "React", tech2: "TailwindCSS", colour: "#456F00", descript: "The Netflix clone project is a web application developed using HTML, CSS, and JavaScript, aiming to replicate the user interface and some features of the popular streaming service, Netflix." },
  { title: "Spanish Writing Assistant", tech1: "React", tech2: "TypeScript", colour: "#006F5B" },
  { title: "Football Webscraper", tech1: "React", tech2: "TypeScript", colour: "#6F0050" },
  { title: "Actorle", tech1: "React", tech2: "TypeScript", colour: "#45006F" }
];

const App: React.FC = () => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [showAuth, setShowAuth] = React.useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as Session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as Session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollElement,
        smooth: true,
        getDirection: true,
      });

      return () => {
        locomotiveScroll.destroy();
      };
    }
  }, []);

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");
        const scrollerInner = scroller.querySelector(".scroller__inner");

        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children);
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as Element;
            duplicatedItem.setAttribute("aria-hidden", "true");
            scrollerInner.appendChild(duplicatedItem);
          });
        }
      });
    }
  }, [showAuth]);

  if (session) {
    return (
      <>
        <div>
          <button
            className="custom-button"
            onClick={async () => {
              await supabase.auth.signOut();
              setSession(null);
            }}
          >
            Log Out
          </button>
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

  if (showAuth) {
    return (
      <div className="login-container">
        <div className="back-container">
          <button
            className="back-button"
            onClick={() => setShowAuth(false)}
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

  return (
    <div className="initial-container">
      <h2 className="initial-title">estia</h2>
      <h3 className="initial-slogan">Less Searching, More Creating</h3>
      <button
        className="initial-button"
        onClick={() => setShowAuth(true)}
      >
        Get Started
      </button>
      <div className="scroller" data-speed="slow">
        <ul className="tag-list scroller__inner">
          <li>Backend Programming</li>
          <li>Angular</li>
          <li>TypeScript</li>
          <li>Databases</li>
          <li>Integration Testing</li>
          <li>Animation</li>
          <li>Blockchain</li>
          <li>UI/UX</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
