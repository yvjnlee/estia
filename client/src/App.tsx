import React from "react";
import { createClient } from "@supabase/supabase-js";
import "./index.css";
import { LandingPage } from "./pages/LandingPage";
import { AuthProvider } from "./context";

const supabase = createClient(
  process.env.REACT_APP_PROJECT_URL as string,
  process.env.REACT_APP_ANON_KEY as string,
);

const App: React.FC = () => {
  return (
    <AuthProvider 
      supabase={ supabase }
    >
      <LandingPage />
    </AuthProvider>
  );
};

export default App;
