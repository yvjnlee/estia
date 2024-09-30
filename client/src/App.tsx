import React from "react";
import { createClient } from "@supabase/supabase-js";
import "./index.css";

import { AuthProvider, ProjectProvider, UserProvider } from "./context";
import AppRoutes from "./routes";
import { ThemeProvider } from "react-bootstrap";

const supabase = createClient(
  process.env.REACT_APP_PROJECT_URL as string,
  process.env.REACT_APP_ANON_KEY as string,
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider supabase={supabase}>
        <UserProvider>
          <ProjectProvider>
            <AppRoutes />
          </ProjectProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
