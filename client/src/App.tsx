import React, { useRef, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectDetails from './components/ProjectDetails';
import { createClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import './index.css';

import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Define projects array with unique titles
const projects = [
  { title: "Stock Prediction Program"},
  { title: "Netflix Clone"},
  { title: "Password Manager" },
  { title: "Football Webscraper"},
  { title: "Actorle" }
];

const supabase = createClient(
  process.env.REACT_APP_PROJECT_URL as string,
  process.env.REACT_APP_ANON_KEY as string
);

const App: React.FC = () => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [showAuth, setShowAuth] = React.useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Initialize Locomotive Scroll
  const initializeScroll = () => {
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
  };

  // Use Effect to handle session change
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as Session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as Session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Reinitialize scrolling effect on auth change
  useEffect(() => {
    if (!session) {
      initializeScroll(); // Ensure scrolling is reinitialized on logout
    }
  }, [session]);

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
          <div className='nav-bar' data-scroll-section>
            <h1 className='logo'>estia</h1>
            <button
              className="log-out-button"
              onClick={async () => {
                await supabase.auth.signOut();
                setSession(null);
                initializeScroll(); // Reinitialize scroll after logout
              }}
            >
              Log Out
            </button>
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
        <div className='registration-container'>
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
