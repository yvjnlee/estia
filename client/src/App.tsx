import React from "react";
import { createClient } from "@supabase/supabase-js";
import "./index.css";

import { AuthProvider } from "./context";
import AppRoutes from "./routes";
import { ProjectProvider } from "./context/ProjectContext";

const supabase = createClient(
  process.env.REACT_APP_PROJECT_URL as string,
  process.env.REACT_APP_ANON_KEY as string,
);

const App: React.FC = () => {
  return (
    <AuthProvider 
      supabase={ supabase }
    >
      <ProjectProvider>
        <AppRoutes />
      </ProjectProvider>
    </AuthProvider>
  );
};

export default App;
