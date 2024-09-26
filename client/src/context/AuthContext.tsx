import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { AuthProps } from "../types/auth";

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  supabase: SupabaseClient;
}> = ({ children, supabase }) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [showAuth, setShowAuth] = React.useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Use Effect to handle session change
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as Session);
    });

    // Set up session listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const logIn = async () => {
    setShowAuth(true);
  };

  const logOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setShowAuth(false);
  };

  const value = {
    session,
    supabase,
    showAuth,
    user,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
