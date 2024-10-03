import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { AuthProps } from "../types/auth";
import { User } from "../types/user";

// Create AuthContext with an initial value of undefined
const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider: React.FC<{
    children: React.ReactNode;
    supabase: SupabaseClient;
}> = ({ children, supabase }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [showAuth, setShowAuth] = useState(false); // State to control showing login page
    const [user, setUser] = useState<User | null>();

    // Handle session changes with useEffect
    useEffect(() => {
        // Get current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);

            if (session?.user) {
                const temp: User = session.user;
                setUser(temp);
            } else {
                setUser(null);
            }
        });

        // Set up session listener
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session?.user) {
                const temp: User = session.user;
                setUser(temp);
            } else {
                setUser(null);
            }
        });

        // Cleanup subscription on component unmount
        return () => subscription.unsubscribe();
    }, [supabase]);

    // Function to initiate login process (e.g., show the login page)
    const logIn = async () => {
        setShowAuth(true);
    };

    // Function to log out and clear session data
    const logOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setShowAuth(false); // Hide the login page after logging out
    };

    // Context value that includes session, user, login/logout, and showAuth
    const value = {
        session,
        supabase,
        showAuth,
        setShowAuth, // Provide setShowAuth so it can be used in other components
        user,
        logIn,
        logOut,
    };

    // Render the provider with the value
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to access AuthContext and throw an error if used outside the provider
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
