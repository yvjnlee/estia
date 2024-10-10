import React from "react";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const LogOutButton = () => {
    const { supabase, logOut } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = async () => {
        await supabase.auth.signOut(); // Sign out from Supabase
        logOut(); // Call the logOut function from context
        navigate('/'); // Redirect to the main landing page
    };

    return (
        <button
            className="log-out-button"
            onClick={handleLogout} // Use handleLogout on click
        >
            Log Out
        </button>
    );
};
