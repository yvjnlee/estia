import React from "react";
import { useAuth } from "../../context";

export const LogOutButton = () => {
  const { supabase, logOut } = useAuth();
  return (
    <button
      className="log-out-button"
      onClick={async () => {
        await supabase.auth.signOut();
        logOut();
      }}
    >
      Log Out
    </button>
  );
};
