import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { logOut } from "../../api/authAPI";

export const LogInButton = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const login = () => {
        // Here you might want to call logOut() if applicable
        navigate('/login'); // Navigate to the Login component
    };

    return (
        <>
            <button className="log-out-button" onClick={login}>
                Log In
            </button>
        </>
    );
};
